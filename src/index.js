import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
  {category: "Sporting Goods", price: "$19.99", stocked: true, name: "Soccerball"},
  {category: "Electronics", price: "$299.99", stocked: true, name: "Galaxy"},

];


const ProductCategoryRow = ({category}) => {
  return (
    <tr className='ProductCategoryRow'>
      <th colSpan='2'>
        {category}
      </th>
    </tr>
  )
}

const ProductRow = ({product}) => {
  return (
    <tr className='ProductRow'>
      <td>{product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>}</td>
      <td>{product.price}</td>
    </tr>
  )
}

//This is an alternate which adds an additional component (Items) which is then added to the ProductTable component. 
//This alternative handles a JSON object that is not sorted by category. This alternative also involves passing props
//down to the Items component which appears redundant.
const Items =({category, products, filterText, inStockOnly}) => {

  const goods = products.filter(p => p.category === category);

  const goodsRows = goods.map(p => {
    if (p.name.indexOf(filterText) === -1 || (inStockOnly && !p.stocked)) {
      return null;
    }
    return (
      <ProductRow
        product={p}
        key={p.name}/>
    )
  })

  return (
    goodsRows.every(p => p == null)
    ? null
    : (
      <tbody>
        <ProductCategoryRow
          category={category}/>
        {goodsRows}
      </tbody>
    )
  )
}

const ProductTable =({products, filterText, inStockOnly}) => {
  return (
    <table className='ProductTable'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <Items
        category='Sporting Goods'
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}/>
      <Items
        category='Electronics'
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}/>
    </table>
  )
}

const SearchBar = ({filterText, inStockOnly, handleCheck, handleChange}) => {
  return (
    <form className='SearchBar'>
      <input
        type='text'
        placeholder='Search...'
        value={filterText}
        onChange={handleChange}/>
      <div>
        <input
          type='checkbox'
          checked={inStockOnly}
          onChange={handleCheck}/>
        <span>Only show products in stock</span>
      </div>
    </form>
  );
}

class FilterableProductTable extends React.Component {
  //NOTE: This following syntax of defining state outside of the constructor, omitting method binding, and using arrow
  //functions on methods are examples of 'class field/properties' which is an experimental(stage 3) syntax of of 03/2019. 
  state = {
    filterText: '',
    inStockOnly: true,
  }
  handleCheck = (event) => {
    this.setState({
      inStockOnly: event.target.checked,
    });
  }
  handleChange = (event) => {
    this.setState({
      filterText: event.target.value,
    })
  }
  render() {
    return (
      <div className='FilterableProductTable'>
        <SearchBar 
          filterText={this.state.filterText}
          handleChange={this.handleChange}
          inStockOnly={this.state.inStockOnly}
          handleCheck={this.handleCheck}/>
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}/>
      </div>
    );
  }
}



ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById('root'));



//This is a component that is similar to the example code. This component relies on the JSON object PRODUCTS to be
//sorted by category.
/*
const ProductTable = ({products, filterText, inStockOnly}) => {
  let rows = [];
  let lastCategory = null;

  products.forEach((prod) => {
    if (prod.name.indexOf(filterText) === -1 || (inStockOnly && !prod.stocked)) {
      return;
    }
    if (prod.category !== lastCategory) {
      rows = [...rows,
        <ProductCategoryRow
          category={prod.category}
          key={prod.category}/>];
    }
    rows = [...rows,
      <ProductRow
        product={prod}
        key={prod.name}/>];
    lastCategory = prod.category;
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
*/






//STYLE AND POSSIBLY ADD FEATURES