

export const decryptBase64 = (encrypted) => {
  try {
    return atob(encrypted)
  } catch (error) {
    return null
  }
}