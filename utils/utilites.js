const utilites = {};

utilites.responseObj = (status, message, data = {}) =>{
    return {status : status, message : message, data : data};
}

module.exports = utilites;