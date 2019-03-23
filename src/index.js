import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];


class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr className='ProductCategoryRow'>
        <th colSpan='2'>
          {category}
        </th>
      </tr>
    )
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>{product.name}</span>
    return (
      <tr className='ProductRow'>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    let rows = [];
    let lastCategory = null;
    this.props.products.forEach(product => {
      (product.category !== lastCategory) &&
        (rows = [...rows, <ProductCategoryRow category={product.category} key={product.category}/>]);
      rows = [...rows, <ProductRow product={product} key={product.name}/>];
      lastCategory = product.category;
    });
    return (
      <table className='ProductTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form className='SearchBar'>
        <input type='text' placeholder='Search...'/>
        <div>
          <input type='checkbox'/>
          <span>Only show products in stock</span>
        </div>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div className='FilterableProductTable'>
        <SearchBar/>
        <ProductTable products={this.props.products}/>
      </div>
    );
  }
}



ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById('root'));




//CONTINUE  DISECTING CODE AND CONTINUE TUTORIAL FROM 'STEP 3: IDENTIFY THE MINIMAL...'