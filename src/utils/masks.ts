interface IMasks {
  cpf: (value?: string) => string;
  cep: (value?: string) => string;
  phone: (value?: string) => string;
  onlyLetters: (value?: string) => string;
  onlyNumbers: (value?: string) => string;
}

const masks: IMasks = {
  cpf: (value = '') => {
    const digitsOnly = value?.replace(/\D/g, '');
    const limitedValue = digitsOnly.substring(0, 11);
  
    return limitedValue
      ?.replace(/(\d{3})(\d)/, '$1.$2')
      ?.replace(/(\d{3})(\d)/, '$1.$2')
      ?.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  },
  cep: (value = '') => {
    const document = value?.replace(/\D/g, '');

    if (document.length > 8) {
      return document
        .slice(0, 8)
        ?.replace(/^(\d{2})(\d)/g, '$1.$2')
        ?.replace(/(\d)(\d{3})$/, '$1-$2');
    }

    return document
      ?.replace(/^(\d{2})(\d)/g, '$1.$2')
      ?.replace(/(\d)(\d{3})$/, '$1-$2');
  },
  phone: (value = '') => {
    const digitsOnly = value?.replace(/[^0-9]/g, '');
    let limit = 10;
    if (digitsOnly && digitsOnly.length >= 3 && digitsOnly[2] === '9') {
      limit = 11;
    }
    const limitedValue = digitsOnly.substring(0, limit);

    return limitedValue
      ?.replace(/^(\d{2})(\d{1})(\d)/g, '($1) $2$3')
      ?.replace(/(\d)(\d{4})$/, '$1-$2');
  },
  onlyLetters: (value = '') => {
    value = value?.replace(/[^0-9a-zA-ZÁÀ-ź ]/g, '')?.replace('  ', '');
    return value?.replace(/[0-9]/g, '');
  },
  onlyNumbers: (value = '') => {
    return value?.replace(/\D/g, '');
  },
};

export default masks;