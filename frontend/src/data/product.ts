import BMW from '../../public/assets/BMW.png';
import Black_Pika from '../../public/assets/Black-pika.png';
import Destop from '../../public/assets/Tom n Jerry.jpeg';
import Dina from '../../public/assets/Dina.png';
import FePika from '../../public/assets/Fe-Pika.png';
import Ninja from '../../public/assets/Ninja.png';
import Pika from '../../public/assets/Pika.png';
import Tortoise from '../../public/assets/Turtoise.png';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women';
};

export const products: Product[] = [
{ id: '1', name: 'BMW AIR SNEAKER', price: 15000, image: BMW, category: 'men' },
{ id: '2', name: 'UMBREON POKEMON AIR SNEAKER', price: 15000, image: Black_Pika, category: 'men' },
{ id: '3', name: 'TOM & JERRY AIR SNEAKER', price: 15000, image: Destop, category: 'women' },
{ id: '4', name: 'KINGDRA POKEMON AIR SNEAKER', price: 15000, image: Dina, category: 'women' },
{ id: '5', name: 'CLEFAIRY POKEMON AIR SNEAKER', price: 15000, image: FePika, category: 'women' },
{ id: '6', name: 'DREDNAW POKEMON AIR SNEAKER', price: 15000, image: Ninja, category: 'men' },
{ id: '7', name: 'CORPHISH POKEMON AIR FORCE', price: 15000, image: Pika, category: 'men' },
{ id: '8', name: 'BULBASAUR POKEMON AIR SNEAKER', price: 15000, image: Tortoise, category: 'women' },
];
