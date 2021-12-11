
export const zipIdToName = (allUsers) => {
  const userDict = {}
  allUsers.forEach( user => userDict[user.id] = user.name )
  return userDict
}


