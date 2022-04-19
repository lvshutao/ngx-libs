export class MyFormData {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static convertJson2FormData(jsonObject: Object, parentKey: string, carryFormData: FormData): FormData {

    const formData = carryFormData || new FormData();
    let index = 0;

    for (const key in jsonObject) {
      // eslint-disable-next-line no-prototype-builtins
      if (jsonObject.hasOwnProperty(key)) {
        // @ts-ignore
        if (jsonObject[key] !== null && jsonObject[key] !== undefined) {
          let propName = parentKey || key;
          if (parentKey && this.isObject(jsonObject)) {
            propName = parentKey + '[' + key + ']';
          }
          if (parentKey && this.isArray(jsonObject)) {
            propName = parentKey + '[' + index + ']';
          }
          // @ts-ignore
          if (jsonObject[key] instanceof File) {
            // @ts-ignore
            formData.append(propName, jsonObject[key]);
          } else { // @ts-ignore
            if (jsonObject[key] instanceof FileList) {
              // @ts-ignore
              for (let j = 0; j < jsonObject[key].length; j++) {
                // @ts-ignore
                formData.append(propName + '[' + j + ']', jsonObject[key].item(j));
              }
            } else { // @ts-ignore
              if (this.isArray(jsonObject[key]) || this.isObject(jsonObject[key])) {
                // @ts-ignore
                this.convertJson2FormData(jsonObject[key], propName, formData);
              } else { // @ts-ignore
                if (typeof jsonObject[key] === 'boolean') {
                  // @ts-ignore
                  formData.append(propName, +jsonObject[key] ? '1' : '0');
                } else {
                  // @ts-ignore
                  formData.append(propName, jsonObject[key]);
                }
              }
            }
          }
        }
      }
      index++;
    }
    return formData;
  }

  static isArray(val: any) {
    const toString = ({}).toString;
    return toString.call(val) === '[object Array]';
  }

  static isObject(val: any) {
    return !this.isArray(val) && typeof val === 'object' && !!val;
  }
}
