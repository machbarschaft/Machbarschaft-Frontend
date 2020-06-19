// https://github.com/jquense/yup/issues/743
export default function validateDisjunction(validFormats, errorMsg) {
    return this.test({
        name: "or",
        message: errorMsg,
        test: inputValue => {
            if(Array.isArray(validFormats) && validFormats.length > 1) {
                const checkResult = validFormats.map(f => f.isValidSync(inputValue));
                return checkResult.some(res => res);
            } else {
                throw new TypeError("Schemas is not correct array schema");
            }
        },
        exclusive: false
    });
}