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

/*
//Example code

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
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    let rows = [];
    let lastCategory = null;

    this.props.products.forEach((prod) => {
      if (prod.name.indexOf(filterText) === -1 || (inStockOnly && !prod.stocked)) {
        return;
      }
      if (prod.category !== lastCategory) {
        rows = [...rows, <ProductCategoryRow category={prod.category} key={prod.category}/>];
      }
      rows = [...rows, <ProductRow product={prod} key={prod.name}/>];
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
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    const handleCheck = this.props.handleCheck;
    const handleChange = this.props.handleChange;
    return (
      <form className='SearchBar'>
        <input type='text' placeholder='Search...' value={filterText} onChange={handleChange}/>
        <div>
          <input type='checkbox' checked={inStockOnly} onChange={handleCheck}/>
          <span>Only show products in stock</span>
        </div>
      </form>
    );
  }
}
*/

//The following 4 functional components were rewritten from class components in the example code above.
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
  //NOTE: This follwing syntax of defining state outside of the constructor, omitting method binding, and using arrow
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


/*
This is an alternate which combines the ProductCategoryRow, ProductRow, and ProductTable components. Besides condensing
components, which makes the components' JavaScript before the render look more like a Vanilla.JS project, this component
assumes which categories are available, wheras the example component instead assumes the objects will be sorted by
category.
NOTE: I should test this component while  introducing state to see the difference between having seperate components
instead of combining them.

class ProductTable extends React.Component {
  render() {
    let sportingGoods = this.props.products.filter(p => p.category === 'Sporting Goods');
    let electronics = this.props.products.filter(p => p.category === 'Electronics');
    const sportingGoodsRows = sportingGoods.map(p => {
      let name = p.stocked ? p.name : <span style={{color: 'red'}}>{p.name}</span>;
      return (
      <tr className='ProductRow' key={name}>
        <td>{name}</td>
        <td>{p.price}</td>
      </tr>
      )
    })
    const electronicsRows = electronics.map(p => {
      let name = p.stocked ? p.name : <span style={{color: 'red'}}>{p.name}</span>;
      return (
      <tr className='ProductRow' key={name}>
        <td>{name}</td>
        <td>{p.price}</td>
      </tr>
      )
    })
    return (
      <table className='ProductTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        <tr className='ProductCategoryRow'>
          <th colSpan='2'>Sporting Goods</th>
        </tr>
        {sportingGoodsRows}
        <tr className='ProductCategoryRow'>
          <th colSpan='2'>Electronics</th>
        </tr>
        {electronicsRows}
      </tbody>
      </table>
    )
  }
}
*/




//INSPECT LIMITATIONS WITH LARGE COMPONENT ABOVE BEFORE SETTING PROJECT ASIDE UNTIL LATER STYLING AND POSSIBLE FEATURE
//ADDITION'.