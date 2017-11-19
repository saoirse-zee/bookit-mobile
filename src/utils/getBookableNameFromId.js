const getBookableNameFromId =
  (bookableId, bookablesArray) => bookablesArray.reduce((result, current) => (
    bookableId === current.id ? current.name : result), '')

export default getBookableNameFromId
