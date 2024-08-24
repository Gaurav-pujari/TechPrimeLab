import Sidebar from "./Sidebar";
import Logo from "./Logo.svg";
import "./ProjectList.css";
import { useEffect, useState } from "react";
import Backarrow from './backarrow.png';
import LogOut from './Logout.svg';
import { useNavigate } from "react-router-dom";
import SearchIcon from "./search.svg";

export default function ProjectList() {

  const [products, setProducts] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);



  const usenavigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let response = await fetch("http://localhost:5000/products");
    let result = await response.json();
    console.log("Fetched products:", result);
    setProducts(result);
  };

  const handleStatusChange = (event, productId, status) => {
    event.preventDefault();
    setUpdateStatus(status);

    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product._id === productId ? { ...product, Status: status } : product
      );
      console.log(status);
      return updatedProducts;
    });
  };

  const handleStartClick = async (event, productId) => {
    handleStatusChange(event, productId, "Running");

    const updatedProduct = products.find((product) => product._id === productId);
    if (updatedProduct) {
      let Status = "Running";
      let result = await fetch(`http://localhost:5000/product/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ Status }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      result = await result.json();
      console.log(result);
    }
  };

  const handleCancelledClick = async (event, productId) => {
    handleStatusChange(event, productId, "Cancelled");

    const updatedProduct = products.find((product) => product._id === productId);
    if (updatedProduct) {
      let Status = "Cancelled";
      let result = await fetch(`http://localhost:5000/product/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ Status }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      result = await result.json();
      console.log(result);
    }
  };

  const handleCloseClick = async (event, productId) => {
    handleStatusChange(event, productId, "Closed");

    const updatedProduct = products.find((product) => product._id === productId);
    if (updatedProduct) {
      let Status = "Closed";
      let result = await fetch(`http://localhost:5000/product/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ Status }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      result = await result.json();
      console.log(result);
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    let result = await fetch(`http://localhost:5000/search/${key}`);
    result = await result.json();
    if (result) {
      setProducts(result);
    }
  };

  const [dropdownData, setDropdownData] = useState("");
  const DropDownList = async (event) => {
    let key = event.target.value;
    setDropdownData(key);
    let response = await fetch(`http://localhost:5000/dropdowndata/${key}`);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      let data = await response.json();
      setProducts(data);
      console.log("This is my data", data);
    }
  };

  const onBackArrowClick = () => {
    usenavigate("/dashboard");
  };

  const onLogoutLink = () => {
    usenavigate("/");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [counts, setCounts] = useState(7);
  const totalPages = Math.ceil(products.length / counts);

  const handlePageChange = (event,pageNumber ) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const last = currentPage * counts;
  const first = last - counts;
  const paginatedProducts = products.slice(first, last);


  const reverseDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    if(month==="01"){
      return `${"Jan"}-${day}-${year}`;
    }

    if(month==="02"){
      return `${"Feb"}-${day}-${year}`;
    }
    if(month==="03"){
      return `${"Mar"}-${day}-${year}`;
    }
    if(month==="04"){
      return `${"Apr"}-${day}-${year}`;
    }

    if(month==="05"){
      return `${"May"}-${day}-${year}`;
    }
    if(month==="06"){
      return `${"June"}-${day}-${year}`;
    }
    if(month==="07"){
      return `${"July"}-${day}-${year}`;
    }
    if(month==="08"){
      return `${"Aug"}-${day}-${year}`;
    }
    if(month==="09"){
      return `${"Sept"}-${day}-${year}`;
    }
    if(month==="10"){
      return `${"Oct"}-${day}-${year}`;
    }
    if(month==="11"){
      return `${"Nov"}-${day}-${year}`;
    }
    else{
      return `${"Dec"}-${day}-${year}`;
    }
    
  };

  return (
    <>
      {windowWidth >= 730 && <Sidebar />}

      <header>
        <div className='header-container'>
          <div className='backarrow'>
            <img className="backarrowimgs" src={Backarrow} alt='backarrow' onClick={onBackArrowClick}></img>
          </div>
          <div className='text'>
            <h5 className='dashboard-header'>Project Listing</h5>
          </div>
          <div className='logo'>
            <img src={Logo} alt="Logo" className="Logo" />
          </div>
          <div className="logouts">
            <img src={LogOut} alt='logout' className='logouts' onClick={onLogoutLink} />
          </div>
        </div>
      </header>

      <form className="forms">
        <div className="project-list-container">
          <div className="search-dropdown-container">

            <input type="text"  placeholder="Search" className="search-input" onChange={searchHandle} />
            <label className="Sortype">SortType:</label>
            <select className="dropdown" onChange={DropDownList} value={dropdownData}>
              <option value="Priority">Priority</option>
              <option value="Category">Category</option>
              <option value="Type">Type</option>
              <option value="Division">Division</option>
              <option value="Reason">Reason</option>
              <option value="Location">Location</option>
              <option value="Department">Department</option>
            </select>
          </div>
        </div>

        <div className="table">
          <table className="tables">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Reason</th>
                <th>Type</th>
                <th>Division</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Dept</th>
                <th>Location</th>
                <th>Status</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, index) => (
                <tr key={index}>
                  <td  style={{ color: "#414950" }}className="themeprojectname">
                    <b>{product.ThemeProject}</b>
                    <div className="dates">
                      <span className="startDate mx-2"> {reverseDate(product.StartDate)}</span> to
                      <span className="endDate mx-2"> {reverseDate(product.EndDate)}</span>
                    </div>
                  </td>
                  <td style={{ color: "#3F3F3F" }} className="Reason"><p className="labels_table">Reason:</p>{product.Reason}</td>
                  <td style={{ color: "#3F3F3F" }} className="Type"><p className="labels_table">Type:</p>{product.Type}</td>
                  <td style={{ color: "#3F3F3F" }} className="Division"><p className="labels_table">Div:</p>{product.Division}</td>
                  <td  style={{ color: "#3F3F3F" }}className="Category"><p className="labels_table">Category:</p>{product.Category}</td>
                  <td style={{ color: "#3F3F3F" }} className="Priority"><p className="labels_table">Priority:</p>{product.Priority}</td>
                  <td  style={{ color: "#3F3F3F" }}className="Department"><p className="labels_table">Dept:</p>{product.Department}</td>
                  <td style={{ color: "#3F3F3F" }} className="Location"><p className="labels_table">Location:</p>{product.Location}</td>
                  <td style={{ color: "#00284C" }}><p className="labels_table">Status</p><b>{product.Status}</b></td>
                  <td>
                    <button className="startbutton" onClick={(event) => handleStartClick(event, product._id)}>Start</button>
                  </td>
                  <td>
                    <button className="closebutton " onClick={(event) => handleCloseClick(event, product._id)}>Close</button>
                  </td>
                  <td>
                    <button className="cancelledbutton  " onClick={(event) => handleCancelledClick(event, product._id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* For mobile use */}
        {paginatedProducts.map((product, index) => (
          <fieldset className="table-mobile" key={index}>
            <div className="row">
              <div className="Themeproject-Status">
                <p className="ThemeProject"><b>{product.ThemeProject}</b></p>
                <p className="Status"><b>{product.Status}</b></p>
              </div>
            </div>
            <div className="row">
              <div className="Dates">
                <span className="startDate"> {product.StartDate}</span> to
                <span className="endDate"> {product.EndDate}</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <p className="labels_table">Reason:</p>{product.Reason}
                  </div>
                  <div className="col">
                    <p className="labels_table">Type:</p>{product.Type}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col">
                    <p className="labels_table">Division:</p>{product.Division}
                  </div>
                  <div className="col">
                    <p className="labels_table">Category:</p>{product.Category}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="labels_table">Priority:</p>{product.Priority}
              </div>
              <div className="col">
                <p className="labels_table">Dept:</p>{product.Department}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="labels_table">Location:</p>{product.Location}
              </div>
            </div>
            <div className="row">
              <div className="row">
                <div className="col"><button className="startbutton" onClick={(event) => handleStartClick(event, product._id)}>Start</button></div>
                <div className="col"><button className="closebutton " onClick={(event) => handleCloseClick(event, product._id)}>Close</button></div>
                <div className="col"><button className="cancelledbutton  " onClick={(event) => handleCancelledClick(event, product._id)}>Cancel</button></div>
              </div>
            </div>
          </fieldset>
        ))}

  
        
      </form>
      <div className="paging">
  <nav aria-label="Pagenavigationexample">
    <ul className="pagination">
      <li className="page-item">
        <button
          className="page-link"
          onClick={(event) => handlePageChange(event, currentPage - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, index) => (
        <li
          key={index + 1}
          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
        >
          <button
            className="page-link"
            onClick={(event) => handlePageChange(event, index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
      <li className="page-item">
        <button
          className="page-link"
          onClick={(event) => handlePageChange(event, currentPage + 1)}
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</div>
{windowWidth < 730 && <Sidebar />}
    </>
  );
}
