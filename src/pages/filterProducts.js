// import React, { useEffect, useState } from 'react'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Toast from 'react-bootstrap/Toast'
// import { Select, Card } from '../components'
// import SpinnerLines from '../components/SpinnerLines'
// import  Login  from './Login'
// import SERVICES from '../services'

// export default function FilterProducts() {
    
//     const [data, setData] = useState({
//         Countries: [],
//         Brands: [],
//         Products: []
//     })

//     const [control, setControl] = useState({
//         CountryId: '',
//         BrandId: '',
//         SearchText: '',
//         ShowSpinner: false,
//         ShowToast: false,
//         curTime: ''
//     })

//     function GetCountries() {
//         SERVICES.APP.GetCountries((data) =>
//             setData(old => ({ ...old, Countries: [{ id: '', country: 'All' }, ...data.data.Countries] }))
//         )
//     }

//     function GetBrands() {
//         SERVICES.APP.GetBrands((data) =>
//             setData(old => ({ ...old, Brands: [{ id: '', name: "All" }, ...data.data.Brands] }))
//         )
//     }

//     function PostFilter() {
//         setControl(old => ({ ...old, ShowSpinner: true }))
//         let requestModel = {
//             country: control.CountryId,
//             model: '',
//             brand: control.BrandId,
//             condition: '',
//             category: ''
//         }
//         SERVICES.APP.FilterProducts(requestModel, (data) => {
//             setData(old => ({ ...old, Products: data.data.result }))
//             setControl(old => ({ ...old, ShowSpinner: false }))
//         }, (err) => {
//             setControl(old => ({ ...old, ShowSpinner: false }))
//         })
//     }

//     useEffect(() => {
//         GetCountries();
//         GetBrands();
//         setControl(old => ({ ...old, curTime: SERVICES.UTILS.getTime() }));
//     }, [])

//     useEffect(() => {
//         PostFilter();
//     }, [control.BrandId, control.CountryId])

//     return (
//         <>
//         <div>
//             <Login />
//         </div>
//             <div className=''>
//                 <SpinnerLines Show={control.ShowSpinner} />
//             </div>
//             <div className='container'>
//                 <Row xs={1} md={3} lg={4} className='justify-content-center m-4'>
//                     <Col>
//                         <Select Key='id' Value='country' Options={data.Countries} Model={control.CountryId} Label='Country' OnChange={(CountryId) => { setControl(old => ({ ...old, CountryId })) }} />
//                     </Col>
//                     <Col>
//                         <Select Key='id' Value='name' Options={data.Brands} Model={control.BrandId} Label='Brand' OnChange={(BrandId) => { setControl(old => ({ ...old, BrandId })) }} />
//                     </Col>
//                 </Row>
//                 <section>
//                     <Row xs={1} md={3} lg={4} >
//                         {data.Products.length > 0 && data.Products.map(product => {
//                             return (
//                                 <Col className='my-2'>
//                                     <Card ImgSrc={`https://aymanmohammad.pythonanywhere.com/${product.images[0].image}`} Category={product.category}
//                                         ImgClicked={() => { setControl(old => ({ ...old, ShowToast: true })) }}
//                                         Price={`${product.currency} ${product.price}`} Text={`${product.country} , ${product.state}`} Condition={product.condition} Title={product.name} footerText={product.brand} />
//                                 </Col>

//                             )
//                         })}
//                     </Row>
//                 </section>
//                 <Toast className='position-fixed end-0 me-5 mb-3 bottom-0' show={control.ShowToast}
//                     bg='light' onClose={() => { setControl(old => ({ ...old, ShowToast: false })) }}>
//                     <Toast.Header className='bg-warning text-dark'>
//                         <strong className="me-auto">Message</strong>
//                         <small>Time {control.curTime}</small>
//                     </Toast.Header>
//                     <Toast.Body>Sorry, the product details page is not available</Toast.Body>
//                 </Toast>
//             </div>
//         </>
//     )
// }