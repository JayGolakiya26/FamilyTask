import React from 'react'

const Navbar = () => {
    return (

        <nav class="navbar navbar-light bg-light ">
            <div class="container-fluid ms-5 me-5">
                <a class="navbar-brand">Family Task</a>
                <form class="d-flex">
                    <button className='btn btn-outline-success'>Members</button>
                    <button class="btn btn-outline-success ms-3" type="submit">ManageTask</button>
                </form>
            </div>
        </nav>  

    )
}

export default Navbar