export const handleAsync = (fn) => async (...args) => {
    try {
      const result = await fn(...args);
      return result;
    } catch (error) {
      console.error("Error caught:", error);
    }
  };