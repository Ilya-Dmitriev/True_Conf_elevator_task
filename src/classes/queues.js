export class Queue {
  constructor(array = []){
    this.queue = array;
  }

  add(item){
    this.queue.push(item);
  }

  take(){
    return this.queue.shift();
  }

  get first(){
    return this.queue[0];
  }

  get length(){
    return this.queue.length;
  }

  includes(item){ 
    return this.queue.includes(item); 
  }
}

export class UniQueue extends Queue {
  constructor(...args){
    super(...args);
  }

  add(item){
    if (!this.queue.includes(item)){
      this.queue.push(item);
    }
  }
}