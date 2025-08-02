export const extractGeneratedText = (data) => {
  try {
    const text =
      data?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.response?.candidates?.[0]?.content?.text;

    return text ?? JSON.stringify(data, null, 2);
    
  } catch (err) {
    return JSON.stringify(data, null, 2);
  }
};
