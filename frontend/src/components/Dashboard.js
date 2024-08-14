import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Logo from './Logo.svg';
import Backarrow from './icons8-back-arrow-50.png';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import LogOut from './Logout.svg';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
    const [totalproject, setTotalProject] = useState("");
    const [closedproject, setclosedProject] = useState("");
    const [runningproject, setrunningproject] = useState("");
    const [closureproject, setclosureproject] = useState("");
    const [cancelledproject, setcancelledproject] = useState("");
    const [chartData, setChartData] = useState({ categories: [], totalProjects: [], closedProjects: [], percentages: [] });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const usenavigate=useNavigate();
   
   
 

    useEffect(() => {

        const handleResize = () => {setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);}


        const allprojectscount=async()=>{
            let response=await fetch("http://localhost:5000/allprojectcounts");
            let result=await response.json();
           setTotalProject(result[0].totalproject);
            setclosedProject(result[1].closedproject);
            setrunningproject(result[2].runningproject);
            setcancelledproject(result[3].cancelledproject);
            setclosureproject(result[4].closuredelay);

        }

        const fetchDepartmentProjects = async () => {
            let response = await fetch("http://localhost:5000/department-projects");
            let data = await response.json();

            const categories = data.map(item => item._id);
            const totalProjects = data.map(item => item.totalProjects);
            const closedProjects = data.map(item => item.closedProjects);
            const percentages = totalProjects.map((total, index) => total > 0 ? (closedProjects[index] / total * 100).toFixed(0) + '%' : '0%');

            setChartData({ categories, totalProjects, closedProjects, percentages });
        };

        handleResize();
        fetchDepartmentProjects();
        allprojectscount();
    }, []);

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: chartData.categories,
            title: {
                text: null
            },
            labels: {
                formatter: function () {                   //used for customization in data labels
                    const index = this.axis.categories.indexOf(this.value);
                    return `<b>${chartData.percentages[index]}</b> <br>${this.value} `;
                },
                style: {
                    fontSize: '12px'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true
                },
                pointPadding: 0.3,
                groupPadding: 0.3
            }
        },
      
        series: [
            {
                name: 'Total Projects',
                data: chartData.totalProjects,
                color: "#025AAB"
            },
            {
                name: 'Closed Projects',
                data: chartData.closedProjects,
                color: "#5AA647"
            }
        ]
    };
const onLogoutLink=()=>{
    usenavigate("/");
}
    return (
        <>
            {windowWidth >= 730 && <Sidebar />}
            <header>
                <div className='header-container'>
                    <div className='backarrow'>
                        <img className="backarrowimg" src={Backarrow} alt='backarrow'></img>
                    </div>
                    <div className='text'>
                        <h5 className='dashboard-header'> Dashboard</h5>
                    </div>
                    <div className='logo'>
                        <img src={Logo} alt="Logo" className='Logo' />
                    </div>
                    <div className="logouts">
                       <img src={LogOut}alt='logout' className='logouts' onClick={onLogoutLink}/> 
                    </div> 
                </div>
            </header>

            <div className='dashboard'>
                <div className='scrollbar-container'>
                    <div className="card mx-3">
                        <div className="card-body">
                            <p className="card-title">Total Projects</p>
                            <p className="card-subtitle mb-2 text-body-secondary">
                                {totalproject}
                            </p>
                        </div>
                    </div>

                    <div className="card mx-3">
                        <div className="card-body">
                            <p className="card-title">Closed</p>
                            <p className="card-subtitle mb-2 text-body-secondary">{closedproject}</p>
                        </div>
                    </div>

                    <div className="card mx-3">
                        <div className="card-body">
                            <p className="card-title">Running</p>
                            <p className="card-subtitle mb-2 text-body-secondary">{runningproject}</p>
                        </div>
                    </div>

                    <div className="card mx-3">
                        <div className="card-body">
                            <p className="card-title">Closure Delay</p>
                            <p className="card-subtitle mb-2 text-body-secondary">{closureproject}</p>
                        </div>
                    </div>

                    <div className="card mx-3">
                        <div className="card-body">
                            <p className="card-title">Cancelled</p>
                            <p className="card-subtitle mb-2 text-body-secondary">{cancelledproject}</p>
                        </div>
                    </div>
                </div>
        
                </div>
            <div className='heading'>
                <h5>Department Wise - Total Vs Closed</h5>
            </div>

            <div className='dashboard-container'>
                <div className='highchart'>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            </div>
            
            {windowWidth < 730 && <Sidebar />}
        </>
    );
}
