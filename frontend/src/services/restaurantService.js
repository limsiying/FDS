import { BehaviorSubject } from 'rxjs';
import { handleErrors } from '../helpers';

function restaurantSignup(name, min, address) {
    const data = { name: name, min: min, address: address };
    const url = "http://localhost:3000/api/v1/restaurant/auth/signup";
    console.log('data???: ', data);
  
    var request = new Request(url, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(data),
    });
  
    return fetch(request)
      .then(handleErrors)
    //   .then((response) => {
    //     response.json().then((data) => {
    //       console.log("resty sign up donezo!!! :D");
    //       return data;
    //     });
    //   });
  }

function searchRestaurantResults(data) {
    var results = [];
    data.forEach(result => results.push(result.resid));
    return results;
}

function restaurantMenuResults(data) {
  var results = [];
  data.forEach(result => results.push(result.itemid));
  return results;
}

function foodCategoryResults(data) {
  var results = [];
  data.forEach(result => results.push(result.categoryname));
  return results;
}

function restaurantPromotionsResults(data) {
  var results = [];
  data.forEach(result => results.push(result.promotionid));
  return results;
}

function searchRestaurant(searchQuery) {
    const url = 'http://localhost:3000/api/v1/restaurant/search?keywords=' + searchQuery;
    console.log('url ', url);

    var request = new Request(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' })
    });

    return fetch(request)
      .then(handleErrors);
}

function getRestaurant(resid) {
    const data = {resid: resid};
    const url = 'http://localhost:3000/api/v1/restaurant/get';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then(handleErrors)
        // .catch((error) => {
        //     console.log('error: ', error);
        // })
}

function editRestaurant(resname, min, id) {
    const data = {resname: resname, min: min, id: id};
    const url = 'http://localhost:3000/api/v1/restaurant/edit';
    console.log('data!!!!: ', data);

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request)
      .then(handleErrors)
    //   .then((response) => {
    //       response.json()
    //           .then((data) => {
    //               console.log('edit resty donezo!');
    //           })
    //   })
}

function getMenu(resid) {
  const url = 'http://localhost:3000/api/v1/restaurant/menu?id=' + resid;

  var request = new Request(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json' })
});

return fetch(request)
  .then(handleErrors);
}

function getFood(foodid) {
  const data = {id: foodid};
  const url = 'http://localhost:3000/api/v1/restaurant/food';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getFoodAvailability(itemid) {
  const data = { id: itemid };
  const url = 'http://localhost:3000/api/v1/restaurant/food/availability';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getPromotions(resid) {
  const data = { id: resid };
  const url = 'http://localhost:3000/api/v1/restaurant/promotions/all';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getPromotionInformation(id) {
  const data = { id: id };
  const url = 'http://localhost:3000/api/v1/restaurant/promotions/info';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getOngoingPromotions(resid) {
  const data = { id: resid };
  const url = 'http://localhost:3000/api/v1/restaurant/promotions/ongoing';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getPastPromotions(resid) {
  const data = { id: resid };
  const url = 'http://localhost:3000/api/v1/restaurant/promotions/past';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function newPromotion(start, end, min, disc, freedeli, resid) {
  const data = { start: start, end: end, min: min, disc: disc, freedeli: freedeli, resid: resid };
  console.log('dataaa', data);
  const url = 'http://localhost:3000/api/v1/restaurant/promotions/new';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function deletePromotion(id) {
  const data = {id: id};
  const url = 'http://localhost:3000/api/v1/restaurant/promotions/delete';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getFoodCategory(foodid) {
  const data = {id: foodid};
  const url = 'http://localhost:3000/api/v1/restaurant/food/category';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function newFoodItem(name, price, limit, resid) {
  const data = {name: name, price: price, limit: limit, resid: resid};
  const url = 'http://localhost:3000/api/v1/restaurant/food/new';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function deleteFood(foodid) {
  const data = {id: foodid};
  const url = 'http://localhost:3000/api/v1/restaurant/food/delete';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getRestaurantFromFood(foodid) {
  const data = {id: foodid};
  const url = 'http://localhost:3000/api/v1/restaurant/food/restaurant';
  console.log('herehereher')

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getRestaurantvailables(resid) {
  const data = {id: resid};
  const url = 'http://localhost:3000/api/v1/restaurant/available';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function searchAvailableFood(keywords) {
  const data = {keywords: keywords};
  const url = 'http://localhost:3000/api/v1/restaurant/search/available';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function searchAllFood(keywords) {
  const data = {keywords: keywords};
  const url = 'http://localhost:3000/api/v1/restaurant/search/available';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getRestaurantName(id) {
  const data = {id: id};
  const url = 'http://localhost:3000/api/v1/restaurant/name';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function editFood(name, price,  limit, itemid, avail) {
  const data = {name: name, price: price, limit: limit, itemid: itemid, avail: avail};
  const url = 'http://localhost:3000/api/v1/restaurant/food/edit';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function editPromotion(start, end, min, disc, freedeli, id) {
  const data = {start: start, end: end, min: min, disc: disc, freedeli: freedeli, id: id};
  const url = 'http://localhost:3000/api/v1/restaurant/promotion/edit';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

function getMin(id) {
  const data = {id: id};
  const url = 'http://localhost:3000/api/v1/restaurant/min';

  var request = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
  });

  return fetch(request)
      .then(handleErrors)
}

export const restaurantService = {
    restaurantSignup,
    searchRestaurant,
    searchRestaurantResults,
    getRestaurant,
    editRestaurant,
    getMenu,
    getFood,
    restaurantMenuResults,
    getFoodAvailability,
    getPromotions,
    restaurantPromotionsResults,
    getPromotionInformation,
    getOngoingPromotions,
    getPastPromotions,
    newPromotion,
    deletePromotion,
    getFoodCategory,
    foodCategoryResults,
    newFoodItem,
    deleteFood,
    getRestaurantFromFood,
    getRestaurantvailables,
    searchAvailableFood,
    searchAllFood,
    getRestaurantName,
    editFood,
    editPromotion,
    getMin
}