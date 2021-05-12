const generateRandomEmail = () => {
    const result = Math.random().toString(36).substring(2,11)
    return result + '@test.com'
}

export const randomEmail = generateRandomEmail();
