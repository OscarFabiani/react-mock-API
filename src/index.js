import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: false, name: "iPod Touch"},
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
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    let rows = [];
    let lastCategory = null;
    this.props.products.forEach(prod => {
      if (prod.category !== lastCategory) {
        rows = [...rows, <ProductCategoryRow category={prod.category} key={prod.category}/>];
      }
      rows = [...rows, <ProductRow product={prod} key={prod.name}/>];
      lastCategory = prod.category;
    });
    //example code
    this.props.products.forEach((prod) => {
      if (prod.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !prod.stocked) {
        return;
      }
      if (prod.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={prod.category}
            key={prod.category} />
        );
      }
      rows = [...rows, <ProductRow product={prod} key={prod.name}/>];
      lastCategory = prod.category;
    });
    //me trying to refine logic using ternary TRY TO MAKE THIS WORK
    this.props.products.filter((prod) =>
       (prod.name.indexOf(filterText) !== -1) ? 
        (!inStockOnly || prod.stocked) ?
          (prod.category !== lastCategory) ? true : false
        : false : false).forEach(prod => {
          rows.push(<ProductCategoryRow category={prod.category} key={prod.category} />);
          rows = [...rows, <ProductRow product={prod} key={prod.name}/>];
          lastCategory = prod.category;
      })
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
    return (
      <form className='SearchBar'>
        <input type='text' placeholder='Search...' value={filterText}/>
        <div>
          <input type='checkbox' checked={inStockOnly}/>
          <span>Only show products in stock</span>
        </div>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
    }
  }
  render() {
    return (
      <div className='FilterableProductTable'>
        <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}/>
        <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}/>
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




//CONTINUE DISSECTING CODE AND CONTINUE TUTORIAL FROM 'STEP 4: IDENTIFY THE MINIMAL...'