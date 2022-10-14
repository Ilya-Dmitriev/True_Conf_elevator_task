export class Queue {
  constructor(){
    this.queue = [];
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
  constructor(){
    super();
  }

  add(item){
    if (!this.queue.includes(item)){
      this.queue.push(item);
    }
  }
}