import TodoModel from "../model/Todo/index.js";
import sequelize from "./config.js";


const syncDB = async () => {
    await sequelize.sync({ alter: true, force: false });
    await TodoModel.sync({ alter: true, force: false });
  };
  
  export default syncDB;
  