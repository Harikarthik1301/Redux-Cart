import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {

  const dummy_product = [
    {
      id : "p1",
      price :"10",
      title: "Tokyo manji Gang",
      description : "A book about the gang in Tokyo"
    },
    {
      id : "p2",
      price :"15",
      title: "JJK",
      description : "A book about the Crused spirits"
    },
    {
      id : "p3",
      price :"10",
      title: "Naruto",
      description : "The Tale of Naruto Uzumali"
    },
    {
      id : "p4",
      price :"15",
      title: "AOT",
      description : "A Book About the cruel Racism"
    },
    
      ];

  return (
    <section className={classes.products}>
      <h2>Buy your favorite Book</h2>
      <ul>
      {dummy_product.map((product) => (
   <ProductItem
   key = {product.id}
   id = {product.id}
   title={product.title}
   price={product.price}
   description={product.description}
 />
      ))}
      </ul>
    </section>
  );
};

export default Products;
