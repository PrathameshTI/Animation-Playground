
import {action, computed, makeObservable, observable} from 'mobx';

interface Hero {
    name: string;
    age: string;
    id: string;
  }
  
class Person {
  personList: Hero[] = [];

  constructor() {
    makeObservable(this, {
      personList: observable,
      addHero: action,
      deleteHero: action,
      count: computed,
    });
  }

  addHero(hero: Hero) {
    this.personList = [...this.personList, hero];
  }

  deleteHero(id: string) {
    this.personList = this.personList.filter(hero => hero.id !== id);
  }

  get count() {
    return this.personList.length;
  }
}

export const personStore = new Person();