import React, { useState, useEffect } from 'react';
import './Insert.css';
import Sidebar from './Sidebar';
import Logo from './Logo.svg';
import Backarrow from './backarrow.png';
import LogOut from './Logout.svg';
import { useNavigate } from 'react-router-dom';
export default function Insert() {
  const usenavigate=useNavigate();
  const [ThemeProject, setThemeProject] = useState("");
  const [Reason, setReason] = useState("");  
  const [Type, setType] = useState("");
  const [Division, setDivision] = useState("");
  const [Category, setCategory] = useState("");
  const [Priority, setPriority] = useState("");
  const [Department, setDepartment] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Location, setLocation] = useState("");
  const [InvalidCredential, SetInvalidCredential] = useState(false);
  const Status = "Registered";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const[error,setError]=useState(false);
 

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CollectData = async (event) => {
    event.preventDefault();
    if(!ThemeProject){
      setError(true);
      return false;
    }
    if (StartDate >= EndDate) {
      SetInvalidCredential(true);
      return false;
    } else {
      console.log(ThemeProject, Reason, Type, Division, Category, Priority, Department, StartDate, EndDate, Location, Status);
      let result = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify({ ThemeProject, Reason, Type, Division, Category, Priority, Department, StartDate, EndDate, Location, Status }),
        headers: { 
          'Content-Type': 'application/json'
        },
      });
      result = await result.json();
      console.log(result);
    }
  };
  const onBackArrowClick=()=>{
    usenavigate("/dashboard");
  }

 const onLogoutLink=()=>{
  usenavigate("/");
 } 
  return (
    <>
      {windowWidth >= 730 && <Sidebar />}
      <header>
        <div className='header-container'>
          <div className='backarrow'>
            <img className="backarrowimgs" src={Backarrow} alt='backarrow'onClick={onBackArrowClick} />
          </div>
          <div className='text'>
            <h5 className='dashboard-header'>Create Project</h5>
          </div>
          <div className='logo'>
            <img src={Logo} alt="Logo" className='Logo' />
          </div>
          <div className="logouts">
            <img src={LogOut} alt='logout' className='logouts' style={{ height: "auto" }}  onClick={onLogoutLink}/>
          </div>
        </div>
      </header>

      <form className='Insert-container' onSubmit={CollectData}>
        <div className='input-details-container'>
          <div className='table1'> 
            <div className="textareas">
              <input
                type="text"
                id="message"
                className={`message ${error && !ThemeProject? 'error' : ''}`} 
                placeholder="Enter Theme Project Here"
                value={ThemeProject}
                onChange={(event) => setThemeProject(event.target.value)}
              />
            
            </div>
            {error && !ThemeProject &&<span className="invalid-input">Project Theme Required </span>}
          </div>
         
          <div className='table2'> 
            <div className="mb-3 ">
              <label  className="form-labels">Reason</label>
              <br></br>
              <select
                className="form-selects"
                aria-label="Default select example"
                value={Reason}
                onChange={(event) => setReason(event.target.value)}
                
              >
                
                <option value="Business" defaultValue>For Business</option>
                <option value="Personal">For Personal</option>
                <option value="Dealership">For Dealership</option>
                <option value="Transport">For Transport</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-labels">Type</label>
              <br></br>
              <select
                className="form-selects"
                aria-label="Default select example"
            
                value={Type}
                onChange={(event) => setType(event.target.value)}
                
              >
                
                <option value="Internal"defaultValue>Internal</option>
                <option value="External">External</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
            <div className="mb-3 ">
              <label htmlFor="division" className="form-labels">Division</label>
              <br></br>
              <select
                className="form-selects"
                aria-label="Default select example"
             
                value={Division}
                onChange={(event) => setDivision(event.target.value)}
                
              >
     
                <option value="Filters"defaultValue>Filters</option>
                <option value="Compressor">Compressor</option>
                <option value="Pumps">Pumps</option>
                <option value="Glass">Glass</option>
                <option value="WaterHeater">WaterHeater</option>
              </select>
            </div>
          </div>

          <div className='table3 '> 
            <div className="mb-3 ">
              <label htmlFor="category" className="form-labels">Category</label>
              <br></br>
              <select
                className="form-selects"
                aria-label="Default select example"
   
                value={Category}
                onChange={(event) => setCategory(event.target.value)}
                
              >
            
                <option value="Quality A"defaultValue>Quality A</option>
                <option value="Quality B">Quality B</option>
                <option value="Quality C">Quality C</option>
                <option value="Quality D">Quality D</option>
              </select>
            </div>
            <div className="mb-3 ">
              <label htmlFor="priority" className="form-labels">Priority</label>
              <br></br>
              <select
                className="form-selects"
                aria-label="Default select example"
       
                value={Priority}
                onChange={(event) => setPriority(event.target.value)}
                
              >
              
                <option value="High"defaultValue>High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-labels">Department</label>
              <br></br>
              <select
                className="form-selects"
                aria-label="Default select example"
      
                value={Department}
                onChange={(event) => setDepartment(event.target.value)}
                
              >
            
                <option value="Strategy"defaultValue>Strategy</option>
                <option value="HR">HR</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Stores">Stores</option>
                <option value="Quality">Quality</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div className='table3'>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-labels">Start Date as per Project Plan</label>
              <br></br>
              <input
                type='date'
                className="form-date"
                aria-label="Default select example"
            
                value={StartDate}
                onChange={(event) => setStartDate(event.target.value)}
                
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="endDate" className="form-labels">End Date as per Project Plan</label>
              <br></br>
              <input
                type='date'
                className="form-date"
                aria-label="Default select example"
              
                value={EndDate}
                onChange={(event) => setEndDate(event.target.value)}
                
              />
              {InvalidCredential && <span className='invalid-input'>End date is smaller than start date</span>}
            </div>
            <div className="mb-3 ">
              <label htmlFor="location" className="form-labels">Location</label>
              <br></br>
              <select
                className="form-selects"
                aria-label="Default select example"
             
                value={Location}
                onChange={(event) => setLocation(event.target.value)}
                
              >
             
                <option value="Pune"defaultValue>Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
              </select>
              <p className="Registration">Status:<b>Registered</b></p>
            </div>
          </div>
        </div>
        <div className='submit-details-container'>
          <button type="submit" className="btn">Save Project</button>
        </div>
      </form>
      {windowWidth <= 430 && <Sidebar />}
    </>
  );
}
