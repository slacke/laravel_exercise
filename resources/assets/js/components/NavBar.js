import React from "react"
export default function Navbar(){
    return(
        <div className = "container">
                <nav className="navbar navbar-default">    
                    <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <h4>Task List</h4>
                                </div>
                                <div className="col-md-4">
                                    <div className="text-right">
                                        <button type="button" className="btn btn-default btn-md">
                                        <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span> 
                                        </button>  
                                    </div> 
                                </div>
                            </div>
                        
                    </div>   
                </nav>
        </div>
    );
}
