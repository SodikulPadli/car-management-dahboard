const { Cars } = require('./models')

class CarController {
    static records = [];
  
    constructor(params) {
      this.car_name = params.car_name;
      this.car_type = params.car_type;
      this.rental_price = params.rental_price;
      this.car_photo = params.car_photo;
    }

    static create(params) {
        const obj = new this(params);
        const result = Cars.create(obj)
    
        return result;
    }

    static list() {
        const result = Cars.findAll()
        return result;
    }

    static find(id) {
        const result = Cars.findByPk(id)
    
        return result;
    }
    
    static update(id, params) {
      const result = Cars.update(params, 
        {
          where:{
            id:id
          }
        }
      )
  
      return result;
    }
  
    static delete(id) {
      const result = Cars.destroy({
        where: { id:id }
      })

      return result
    }
  
  }
  
module.exports = CarController;