export const ERROR_TYPES = {
  user:{
    EMAIL_ALREADY_EXISTS:{TAG:"DUPLICATED CONSTRAINT", MESSAGE:"This username already exists!"},
    CREATE_USER_ERROR:{TAG:"CREATE ERROR", MESSAGE:"Error creating user! Please verify your credentials!"},
    GENERIC_LOGIN_ERROR:{TAG:"LOGIN ERROR",MESSAGE:"Please verify your credentials!"},
  },

  
  //database catch errors
  database:{
  INSERT_ERROR:{TAG:"DATABASE INSERT ERROR", MESSAGE:"ERROR INSERTING DATA INTO DATABASE!!!"},
  SELECT_ERROR:{TAG:"DATABASE SELECT ERROR", MESSAGE:"ERROR SELECTING DATA FROM DATABASE!!!"},
  }
}