import { useState,  useEffect, useMemo } from "react";
import LandingHeader from "../../components/LandingHeader";
import Footer from "../../components/Footer";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form, FloatingLabel, FormGroup, Alert, Col, Row} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PetCard from "../../components/PetCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import CPagination from "../../components/CPagination";

function NoMatchingResult() {
    return (
        <div style={{display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", alignItems: "center"}}>
        <i className="bi bi-journal-x"  style={{fontSize: "300px", color: "grey"}}></i>
        <p>No Matching Result Found.</p>
        </div>
    )
}

// Reference Lecture example: URL parser.
function to_url_params(object) {
    var result = [];
    for (const key in object) {
        if (Array.isArray(object[key])) {
            for (const value of object[key]) {      
                result.push(`${key}[]=${value}`);
            }
        }
        else {
            let value = object[key];
            if (value !== "") {
                result.push(`${key}=${value}`);
            }
            // }
        }
    }
    return result.join('&');
}

function SearchFilter() {
    // const [currentActivePage, setcurrentActivePage] = useState(1);
    // const itemsPerPage = 5;
    const [petsInfo, setPetsInfo] = useState(null);
    const [petType, setPetType] = useState(null);
    
    // searchparam initial state
    const [sortOption, setSortOption] = useState("");
    const [filterOptions, setFilterOptions] = useState({age: "", weight: "", sex: "", fee: "", pet_type:"", breed: "", owner: "", status: ""});
    const [petTypes, setPetTypes] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [shelters, setShelters] = useState([]);    
    
    // const [colorFilter, setColorFilter] = useState("");
    



    const [ searchParams, setSearchParams ] = useSearchParams();
    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        size: parseInt(searchParams.get("size") ?? 12),
        age__gte : searchParams.get("age__gte") ?? "",
        age__lte : searchParams.get("age__lte") ?? "",
        weight__gte : searchParams.get("weight__gte") ?? "",
        weight__lte : searchParams.get("weight__lte") ?? "",
        adoption_fee__gte : searchParams.get("adoption_fee__gte") ?? "",
        adoption_fee__lte : searchParams.get("adoption_fee__lte") ?? "",
        sex : searchParams.get("sex") ?? "",
        order_by : searchParams.get("order_by") ?? "name",
        name: searchParams.get("name") ?? "",
        pet_type: searchParams.get("pet_type") ?? "",
        breed: searchParams.get("breed") ?? "",
        owner: searchParams.get("owner") ?? "",
        status: searchParams.get("status") ?? "",
    }), [searchParams]);
    

    // used for pagination state management
    const setcurrentActivePage = (value) => {
        setSearchParams({...query, page : value})
    }

    useEffect(function() {
        async function fetchPetTypes() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/pets/pettype/`, {
                method: 'GET',
            });
            if (response.status === 403) {
                navigate('/');
  
                // setAllowAccess(false);
            } else if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                setPetTypes([...data])
                console.log(data)
  
            }} catch (e) {
                console.log(e);
                navigate('/');
            }
        }
        fetchPetTypes();
  
    }, [])

    useEffect(function () {
        async function fetchShelters() {
            try { 
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/shelter`);
            
                if (response.status >= 200 && response.status < 302) {
                    const data = await response.json();
                    setShelters([...data])
                    console.log(data)
                    
                    // console.log(shelterList)
                
                } else if (response.status = 404) {
                    alert(404);
                }
                else {
                    console.log(response.status)

                }} catch (e) {
                    console.log(e);
                    navigate('/');
                }
        }
        fetchShelters();

    }, []);
  
  
    useEffect(function() {
        async function fetchBreeds() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/pets/pettype/${petType}/breed`, {
                method: 'GET',
            });
            if (response.status === 403) {
                navigate('/');
  
                // setAllowAccess(false);
            } else if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                setBreeds([...data])
                console.log(data)
  
            }} catch (e) {
                console.log(e);
                navigate('/');
            }
        }
        fetchBreeds();
  
    }, [petType])
  

    const submitFilterOptions = (e) => {
        e.preventDefault()
        var additionalQuery = {}
        var queryAgeMin = "";
        var queryAgeMax = "";
        var queryWeightMin = "";
        var queryWeightMax = "";
        var queryFeeMin = "";
        var queryFeeMax = "";
        var querySex = "";
        
        switch(filterOptions?.age) {
            case "":
                queryAgeMin = "";
                queryAgeMax = "";
                break;
            case "newborn":
                queryAgeMin = "0";
                queryAgeMax = "2";
                break;
            case "young":
                queryAgeMin = "2";
                queryAgeMax = "5";
                break;
            case "adult":
                queryAgeMin = "5";
                queryAgeMax = "9";
                break;
            case "old":
                queryAgeMin = "9";
                queryAgeMax = "999";
                break;
            default:
                break;
        }
        switch(filterOptions?.weight) {
            case "":
                queryWeightMin = "";
                queryWeightMax = "";
                break;
            case "sm":
                queryWeightMin = "0";
                queryWeightMax = "20";
                break;
            case "md":
                queryWeightMin = "20";
                queryWeightMax = "50";
                break;
            case "lg":
                queryWeightMin = "50";
                queryWeightMax = "73";
                break;
            case "xl":
                queryWeightMin = "73";
                queryWeightMax = "999";
                break;
            default:
                break;
        }
        switch(filterOptions?.fee) {
            case "":
                queryFeeMin = "";
                queryFeeMax = "";
                break;
            case "cheap":
                queryFeeMin = "1";
                queryFeeMax = "100";
                break;
            case "medium":
                queryFeeMin = "100";
                queryFeeMax = "1000";
                break;
            case "high":
                queryFeeMin = "1000";
                queryFeeMax = "99999";
                break;
            default:
                break;
        }
        switch(filterOptions?.sex) {
            case "":
                querySex="";
                break;
            case "female":
                querySex="female";
                break;
            case "male":
                querySex="male";
                break;
            default:
                break;
        }


        additionalQuery = {age__gte: queryAgeMin, 
            age__lte: queryAgeMax, 
            weight__gte: queryWeightMin, 
            weight__lte: queryWeightMax,
            adoption_fee__gte: queryFeeMin,
            adoption_fee__lte: queryFeeMax,
            sex: querySex,
            pet_type: filterOptions?.pet_type,
            breed: filterOptions?.breed,
            owner: filterOptions?.owner,
            status: filterOptions?.status,
        }
        

        // delete query.sex;

        setSearchParams(
            {...query, 
            ...additionalQuery,

            page: 1
        });
        setShow(false);
    }



    const clearOptions = () => {
        setFilterOptions({sex:"", age:"", weight:"", fee:"", pet_type: "", breed: "", owner: "", status: ""});
        setSortOption("");
    }

    const resetFilters = () => {
        clearOptions();
        navigate('/searchpage');
    }

    // filter side Offcanvas 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // router navigation
    const navigate = useNavigate();

    useEffect(function () {
        const urlParams = to_url_params(query);
        async function fetchPets() {
            try { 
                const response = await fetch(`${process.env.REACT_APP_API_URL}/pets?${urlParams}`, {
                method: 'GET',
            });
            
            if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                setPetsInfo({...data})
                
                console.log(data)
               
            } else if (response.status = 404) {
                alert(404);
            }
            else {
                console.log(response.status)

            }} catch (e) {
                console.log(e);
                navigate('/');
            }
        }
        fetchPets();

    }, [query]);

    const pagesCount = Math.ceil(petsInfo?.count / query?.size);
    const noResult =petsInfo?.count === 0 || isNaN(pagesCount);


    return (
        
        <div style={{background: `#F5F5F5`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition:"center", minHeight: "100vh"}}>
            <LandingHeader />
            <div style={{minHeight: "100vh"}}>
                <Alert variant={noResult?"danger":"secondary"} style={{marginTop: "5px", paddingLeft: "3rem"}}>
                    {noResult ? 
                    <><i class="bi bi-exclamation-triangle"></i>Sorry, no result is found. Try clear the filter and try again.</> :
                    <>Found <span style={{fontWeight: "bold"}}>{petsInfo?.count??0}</span> matching results in {pagesCount??1} pages</>}
                </Alert>
                <div style={{display: "flex", justifyContent: "right", paddingRight: "3rem", gap:"2px"}}>
                <Button variant="outline-primary" onClick={resetFilters}
                    
                    style={{fontWeight: "500"}}>
                    Reset All
                </Button>
                <Button variant="outline-primary" onClick={handleShow} style={{fontWeight: "500"}}>
                    Show Filters<i className="bi bi-sort-down"></i>
                </Button>

                </div>
                <div style={{width: "85%", margin: "1rem auto", minHeight: "60vh"}}>
                <Row xs={1} s={2} md={2} lg={3} xl={4} >
                    {noResult&& <NoMatchingResult></NoMatchingResult>}
                    {petsInfo?.results?.map((pet, index) => <Col  key={index}><PetCard pet={{...pet}}></PetCard></Col>)}
                </Row>
                </div>
                

                <Offcanvas show={show} onHide={handleClose} >
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{fontSize: "33px", fontFamily:"Georgia"}}> Dream Pet Access </Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr></hr>
                    <Offcanvas.Body>
                    <Form onSubmit={(e) => submitFilterOptions(e)}>
                        <FormGroup className="mb-3">
                            <FloatingLabel label="Category:">
                            <Form.Select className="border-secondary" value={filterOptions?.pet_type} onChange={(e)=> {setFilterOptions({...filterOptions, pet_type: e.target.value, breed: ""}); if (e.target.value !== "")setPetType(e.target.value)}}>

                            <option value="">Select All</option>
                            {petTypes?.map((item, index) =>
                                <option value={item.id} key={item.id}>{item.name}</option>
                            )}

                            </Form.Select>
                               
                            </FloatingLabel>
                                
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FloatingLabel label="Breed:">
                            <Form.Select className="border-secondary" value={filterOptions?.breed} onChange={(e) => {setFilterOptions({...filterOptions, breed: e.target.value})}}>

                                <option value="">Select All</option>
                                {breeds?.map((item, index) =>
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                )}

                                </Form.Select>
                            </FloatingLabel>
                                
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FloatingLabel label="Shelter:">
                            <Form.Select className="border-secondary" value={filterOptions?.owner} onChange={(e) => {setFilterOptions({...filterOptions, owner: e.target.value})}}>

                                <option value="">Select All</option>
                                {shelters?.map((item, index) =>
                                            <option value={item.id} key={item.id}>{item.username}</option>
                                )}

                                </Form.Select>
                            </FloatingLabel>
                                
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FloatingLabel label="Status:">
                                <Form.Select className="border-secondary" value={filterOptions?.status} onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}>

                                <option value="">Select Available</option>
                                <option value="pending">Pending</option>
                                <option value="withdrawn">Withdrawn</option>
                                <option value="adopted">Adopted</option>
                            
                                </Form.Select>
                                
                            </FloatingLabel>
                                
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FloatingLabel label="Age:">
                                <Form.Select className="border-secondary" value={filterOptions?.age} onChange={(e) => setFilterOptions({...filterOptions, age: e.target.value})}>

                                <option value="">Select All</option>
                                <option value="newborn">Newborn(0-2 year old)</option>
                                <option value="young">Young(2-5 years old)</option>
                                <option value="adult">Adult(5-9 years old)</option>
                                <option value="old">Old(9+ years old)</option>
                                </Form.Select>
                                
                            </FloatingLabel>
                                
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FloatingLabel label="Size:">
                                <Form.Select className="border-secondary" value={filterOptions?.weight} onChange={(e) => setFilterOptions({...filterOptions, weight: e.target.value})}>
                                    <option value="">Select All</option>
                                    <option value="sm">Small(0-20 lbs)</option>
                                    <option value="md">Medium(20-50 lbs)</option>
                                    <option value="lg">Large(50-73 lbs)</option>
                                    <option value="xl">XL(73+ lbs)</option>
                                </Form.Select>
                            </FloatingLabel>
                                
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FloatingLabel label="Gender:">
                            <Form.Select className="border-secondary" value={filterOptions?.sex} onChange={(e) => setFilterOptions({...filterOptions, sex: e.target.value})}>
                                    <option value="">Select Both</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Select>
                            </FloatingLabel>
                                
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FloatingLabel label="Adoption Fee:">
                            <Form.Select className="border-secondary" value={filterOptions?.fee} onChange={(e) => setFilterOptions({...filterOptions, fee: e.target.value})}>
                                    <option value="">Select All</option>
                                    <option value="cheap">$0-100</option>
                                    <option value="medium">$100-1000</option>
                                    <option value="high">$1000+</option>
                                </Form.Select>
                            </FloatingLabel>
                                
                        </FormGroup>
                        <FormGroup className="mb-3" style={{display: "flex", justifyContent: "space-between"}}>
                        <Button className=" outline-primary" type="submit" style={{width: "45%"}}>Apply Filters</Button>
                        <Button className="" onClick={(e)=>{e.preventDefault(); clearOptions();}} style={{width: "45%"}}>Clear Filters</Button>

                        </FormGroup>

                        
                        
                    </Form>
                    <hr style={{borderWidth: "2px"}}></hr>
                    
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        setSearchParams({...query, order_by: sortOption, page: 1});
                        setShow(false);
                        }}>
                        <FormGroup className="mb-3 mt-4">
                            <FloatingLabel label="Sort By">
                            <Form.Select className="border-primary" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>

                            <option value="">Relavence</option>
                            <option value="name">Name&#8593;(A to Z)</option>
                            <option value="-name">Name&#8595;(Z to A)</option>
                            <option value="age">Age&#8593;(1 to 8+)</option>
                            <option value="-age">Age&#8595;(8+ to 1)</option>
                            <option value="weight">Size&#8593;(light to heavy)</option>
                            <option value="-weight">Size&#8595;(heavy to light)</option>
                            <option value="adoption_fee">Fee&#8593;(cheap to expensive)</option>
                            <option value="-adoption_fee">Fee&#8595;(expensive to cheap)</option>
                            </Form.Select>
                               
                            </FloatingLabel>
                                
                        </FormGroup>
                        <FormGroup className="mb-3">
                        <Button className="w-100" type="submit">Start Sorting</Button>

                        </FormGroup>

                        <hr></hr>

                        

                    </Form>        
                    </Offcanvas.Body>
                </Offcanvas>

                
            </div>
            {!noResult && <CPagination setcurrentActivePage={setcurrentActivePage} currentActivePage={query?.page} pagesCount={pagesCount}/>}
            <Footer />
      </div>
   
    )
}

export default SearchFilter;
