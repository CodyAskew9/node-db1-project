const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  const trimmed = name.trim()
  if(!budget || !name){
    next({ status: 400, message: "name and budget are required" })
  } else if(isNaN(budget)){
    next({ status: 400, message: "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000){
    next({ status: 400, message: "budget of account is too large or too small" })
  } else if ( trimmed.length < 3 || trimmed.length > 100 ){
    next({ status: 400, message: "name of account must be between 3 and 100" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const { name } = req.body
    const accounts = await Accounts.getAll()
    const match = await accounts.filter(account => account.name === name)
    if (!match[0].name) {
      next()
    } else {
      next({ status: 400, message: "that name is taken" })
    }  
  } catch (err) {
      next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    if(!account || account.length < 1){
        next({ status: 404, message: "account not found" })
    } else {
        next()
    }  
  } catch (err) {
      next(err)
  }
}