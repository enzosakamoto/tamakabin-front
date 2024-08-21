export const useData = () => {
  const getData = async () => {
    const response = await fetch('/api/data')
    return await response.json()
  }

  return { getData }
}
