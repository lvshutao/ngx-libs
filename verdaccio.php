#!/usr/local/opt/php@7.4/bin/php

<?php
// 修改 package.json 后，自动编译并发布

// 编译的顺序（注意依赖）
$libDevs = ['ngxbase', 'ngxupload', 'ngxeditor', 'ngxmaz', 'ngxapp'];

// 当前环境配置
$workPath = __DIR__;
// 类库目录
$libsPath = $workPath . '/libs';


if (!$workPath) {
  echo '无法获取 nx project 工作目录';
  exit(1);
}

if (!file_exists($libsPath)) {
  echo 'nx project libs 目录不存在';
  exit(2);
}

// nx 命令
$nxScript = $workPath . '/node_modules/.bin/nx';
if (!file_exists($nxScript)) {
  echo 'node_modules/.bin/nx 不存在';
  exit(2);
}

// 检查库类 package.json [ngxapp => @fsl/ngxapp]
$libPackages = [];

foreach ($libDevs as $dirname) {
  if (is_dir($libsPath . '/' . $dirname)) {

    // 获取对应的包名 name，因为包名可能跟目录名不一致
    $package = $libsPath . '/' . $dirname . '/package.json';
    if (!file_exists($package)) {
      echo printf("不能找到包(%s)的 package.json 文件", $dirname);
      exit(2);
    }

    $data = json_decode(file_get_contents($package), true);
    // 保存名称及其版本
    $libPackages[$dirname] = [
      'name' => $data['name'],
      'version' => $data['version'],
    ];
  } else {
    echo '不存在的库路径:', $libsPath . '/' . $dirname, PHP_EOL;
    exit(2);
  }
}

if (empty($libPackages)) {
  echo '没有在项目下找到任何包', PHP_EOL;
  exit(2);
}

// 检查库的最新版本 npm view <package> version
echo '|__ 准备比较库版本...', PHP_EOL;

$npm = 'npm --registry http://localhost:4873';
$qVersionFormat = '%s view %s version';

$buildLibrary = [];
foreach ($libDevs as $lib) {
  $qPackage = $libPackages[$lib];

  $rstCode = -1;
  $cmd = sprintf($qVersionFormat, $npm, $qPackage['name']);
  $result = [];
  exec($cmd, $result, $rstCode);

  if ($rstCode != 0) {
    echo '查询命令:( ' . $cmd . ' )执行结果错误', PHP_EOL;
    print_r($result);
    exit(1);
  } else if (!isset($result[0])) {
    echo '查询结果错误:', PHP_EOL;
    var_dump($result);
    exit(1);
  }

  $version = $result[0];

  if ($qPackage['version'] != $version) {
    echo '|-> package:', $qPackage['name'], ', local version:', $qPackage['version'], ', publish version:', $version, PHP_EOL;
    $buildLibrary[] = $lib;
  }
}

if (empty($buildLibrary)) {
  echo '没有需要更新库', PHP_EOL;
  exit(0);
}

// 编译
echo '|__ 准备编译库...', PHP_EOL;
foreach ($libDevs as $lib) {
  if (in_array($lib, $buildLibrary)) {
    $cmd = sprintf("%s build %s", $nxScript, $lib);
    $rstCode = -1;
    system($cmd, $rstCode);
    if ($rstCode != 0) {
      echo 'build 命令:( ', $cmd, ' )执行结果错误', PHP_EOL;
      exit(1);
    }
    echo '|__|__ ', '完成编译 ', $lib, PHP_EOL;
  }
}

// 发布
echo '|__ 准备发布库...', PHP_EOL;
sleep(1);
$distPath = $workPath . '/dist/libs/';
foreach ($buildLibrary as $lib) {
  $pubDir = $distPath . $lib;
  if (!file_exists($pubDir)) {
    echo '库发布目录不存在:', $pubDir, PHP_EOL;
    exit(1);
  }

  if (chdir($pubDir)) {
    $cmd = sprintf('%s publish', $npm);

    $rstCode = -1;
    system($cmd, $rstCode);
    if ($rstCode != 0) {
      echo '发布命令:( ', $cmd, ' ) 执行结果错误', PHP_EOL;
      exit(1);
    }
    echo '|__|__ ', '完成发布 ', $lib, PHP_EOL;
  } else {
    echo '无法切换到库发布目录:', $pubDir, PHP_EOL;
    exit(1);
  }
}


echo 'Done.', PHP_EOL;
exit(0);
