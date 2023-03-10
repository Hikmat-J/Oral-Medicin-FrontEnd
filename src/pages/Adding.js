import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import { Select, Card, Button, Input, Textarea, Dialog } from '../components'
import MultiSelect from '../components/MultiSelect'
import SERVICES from '../services'
import UploadImages from '../components/imagesUpload'


export default function Adding(props) {
    const [data, setData] = useState({
        appTime: [],
        colors: [],
        comor: [],
        edges: [],
        pains: [],
        positions: [],
        sprawls: [],
        spreadSpeeds: [],
        textures: [],
        Images: [],
        PropertiesNames: [
            { Key: 'appTime', Value: 'Appearance Time' },
            { Key: 'spreadSpeeds', Value: 'Spread Speed' },
            { Key: 'pains', Value: 'Pain' },
            { Key: 'colors', Value: 'Color' },
            { Key: 'comor', Value: 'Comor' },
            { Key: 'edges', Value: 'Edge' },
            { Key: 'textures', Value: 'Texture' },
            { Key: 'positions', Value: 'Position' },
            { Key: 'sprawls', Value: 'Sprawl' },
        ]

    })

    const [model, setModel] = useState({
        AppTimeSelected: '0',
        ColorsSelected: [],
        ComorsSelected: [],
        EdgesSelected: [],
        PainsSelected: '0',
        PositionsSelected: [],
        SprawlsSelected: [],
        SpreadSpeedSelected: '0',
        TextureSelected: [],
        images: [],
        Name: '',
        Description: "",
        Diagnosis: "",
        Treatment: "",

    })
    const [control, setControl] = useState({
        ShowProperty_Dialog: false,
        ShowNotification: false,
        SelectedPropertyName: ''
    })
    const [propertyModel, setPropertyModel] = useState({
        Value: ''
    })

    async function GetProperties() {
        var tempData = {
            appTime: [],
            colors: [],
            comor: [],
            edges: [],
            pains: [],
            positions: [],
            sprawls: [],
            spreadSpeeds: [],
            textures: [],
        }
        await SERVICES.APP.GetProperty('positions', (resData) => tempData.positions = resData)
        await SERVICES.APP.GetProperty('appTime', (resData) => tempData.appTime = resData)
        await SERVICES.APP.GetProperty('colors', (resData) => tempData.colors = resData)
        await SERVICES.APP.GetProperty('comor', (resData) => tempData.comor = resData)
        await SERVICES.APP.GetProperty('edges', (resData) => tempData.edges = resData)
        await SERVICES.APP.GetProperty('pains', (resData) => tempData.pains = resData)
        await SERVICES.APP.GetProperty('sprawls', (resData) => tempData.sprawls = resData)
        await SERVICES.APP.GetProperty('spreadSpeeds', (resData) => tempData.spreadSpeeds = resData)
        await SERVICES.APP.GetProperty('textures', (resData) => tempData.textures = resData)

        setData(old => ({ ...old, ...tempData }))
    }
    function AddProperty() {
        let propertyName = control.SelectedPropertyName;
        SERVICES.APP.AddProperty(`${propertyName}`, propertyModel, () => {
            var tempData = { ...data }
            SERVICES.APP.GetProperty(`${propertyName}`, (resData) => {
                tempData[`${propertyName}`] = resData;
                setData(tempData)
            })
        })


    }
    function AddDisease() {
        var req = {};
        [
            'ColorsSelected',
            'ComorsSelected',
            'EdgesSelected',
            'PositionsSelected',
            'SprawlsSelected',
            'TextureSelected',

        ].map(r => req[r] = model[r].map(i => i.value))
        console.log(req)
        SERVICES.APP.AddDisease({ ...req },
            res => console.log('added successfully'),
            res => console.log('error', res)
        )
    }


    async function Submit() {
        // await SaveImages();
        var req = {};
        [
            'ColorsSelected',
            'ComorsSelected',
            'EdgesSelected',
            'PositionsSelected',
            'SprawlsSelected',
            'TextureSelected',

        ].map(r => req[r] = model[r].map(i => i.value))
        console.log(req)
        await SERVICES.APP.AddDisease({ ...model, ...req },
            res => console.log('added successfully'),
            res => console.log('error', res)
        )
    }

    function openImage(image) {
        image = 'IMG-20221014-WA0002.jpg1678315922363.jpg'
        window.open('/images/' + image)
    }
    var images = [];
    async function SaveImages() {
        await data.Images.map(async (image, index) => {
            await SERVICES.APP.UploadImages(image.file, index, (res => {
                images.push(res);
                setModel(old => ({ ...old, images: [...old.images, res] }))
            }))
        })
    }
    useEffect(() => {
        GetProperties()
    }, [])
    return (
        <>
            <Row className=' justify-content-center'>
                <Button Class=' w-auto btn-lg m-2 text-light bg-success ' Label='Submit' Clicked={Submit} />
                <Button Label='Add Key' Class='w-auto m-2 btn-secondary text-warning btn-lg'
                    Clicked={() => setControl(old => ({ ...old, ShowProperty_Dialog: true }))} />

            </Row>
            <div className='text-start ms-4'>
            </div>

            <Row sm={1} md={2} className='m-5 my-1 py-2 p-5'>
                <Col>
                    <Input Label='Name' LabelClass='mb-2' Class='w-100 text-white'
                        OnChange={(Name) => setModel(old => ({ ...old, Name }))} Model={model.Name} />
                </Col>
                <Col>
                    <Textarea Label='Description' Class='w-100 text-white'
                        OnChange={(Description) => setModel(old => ({ ...old, Description }))} Model={model.Description} />
                </Col>
                <Col>
                    <Textarea Label='Diagnosis' Class='w-100 text-white'
                        OnChange={(Diagnosis) => setModel(old => ({ ...old, Diagnosis }))} Model={model.Diagnosis} />
                </Col>
                <Col>
                    <Textarea Label='Treatment' Class='w-100 text-white'
                        OnChange={(Treatment) => setModel(old => ({ ...old, Treatment }))} Model={model.Treatment} />
                </Col>
            </Row>
            <Row xs={1} sm={2} md={4} lg={5} className='m-5 mt-1 pt-2 p-5'>

                <Col >
                    <Select Label='Appearance Time' Key='_id' Value='Value'
                        Options={data.appTime} Model={model.AppTimeSelected}
                        OnChange={(AppTimeSelected => setModel(old => ({ ...old, AppTimeSelected })))} />
                </Col>
                <Col >
                    <Select Label='Spread Speed' Key='_id' Value='Value'
                        Options={data.spreadSpeeds} Model={model.SpreadSpeedSelected}
                        OnChange={(SpreadSpeedSelected => setModel(old => ({ ...old, SpreadSpeedSelected })))} />
                </Col>
                <Col >
                    <Select Label='Pain' Key='_id' Value='Value'
                        Options={data.pains} Model={model.PainsSelected}
                        OnChange={(PainsSelected => setModel(old => ({ ...old, PainsSelected })))} />
                </Col>
                <Col >
                    <MultiSelect
                        Label='Color'
                        Key='_id'
                        Value='Value'
                        Options={data.colors}
                        Model={model.ColorsSelected}
                        OnChange={((ColorsSelected, Ids) => {
                            console.log(Ids)

                            setModel(old => ({ ...old, ColorsSelected }))
                        }
                        )}
                    />
                </Col>
                <Col >
                    <MultiSelect Label='Comor' Key='_id' Value='Value'
                        Options={data.comor} Model={model.ComorsSelected}
                        OnChange={(ComorsSelected => setModel(old => ({ ...old, ComorsSelected })))} />
                </Col>
                <Col >
                    <MultiSelect Label='Edge' Key='_id' Value='Value'
                        Options={data.edges} Model={model.EdgesSelected}
                        OnChange={(EdgesSelected => setModel(old => ({ ...old, EdgesSelected })))} />
                </Col>
                <Col >
                    <MultiSelect Label='Textture' Key='_id' Value='Value'
                        Options={data.textures} Model={model.TextureSelected}
                        OnChange={(TextureSelected => setModel(old => ({ ...old, TextureSelected })))} />
                </Col>
                <Col >
                    <MultiSelect Label='Position' Key='_id' Value='Value'
                        Options={data.positions} Model={model.PositionsSelected}
                        OnChange={(PositionsSelected => setModel(old => ({ ...old, PositionsSelected })))} />
                </Col>
                <Col >
                    <MultiSelect Label='Sprawl' Key='_id' Value='Value'
                        Options={data.sprawls} Model={model.SprawlsSelected}
                        OnChange={(SprawlsSelected => setModel(old => ({ ...old, SprawlsSelected })))} />
                </Col>
            </Row>

            <div className='w-100 mt-0 container'>
                <label className='text-light fw-bold fs-4'>Images : </label>
                <UploadImages ImagesChange={(Images) => { setData(old => ({ ...old, Images })) }} />
            </div>
            <Button Class=' w-auto btn-lg m-2 text-light bg-success ' Label='Upload All Images' Clicked={SaveImages} />

            <hr />
            <Dialog
                Show={control.ShowProperty_Dialog}
                OnSave={() => {
                    AddProperty();
                    setControl(old => ({ ...old, ShowProperty_Dialog: false, SelectedPropertyName: 0 }));
                    setPropertyModel(old => ({ ...old, Value: '' }))
                }}
                OnClose={() => {
                    setControl(old => ({ ...old, ShowProperty_Dialog: false, SelectedPropertyName: 0 }));
                    setPropertyModel(old => ({ ...old, Value: '' }))
                }}
            >
                <Select Label='Property' LabelClass='text-secondary'
                    Options={data.PropertiesNames} Model={control.SelectedPropertyName}
                    OnChange={SelectedPropertyName => setControl(old => ({ ...old, SelectedPropertyName }))}
                />
                <Input Label='Value' Model={propertyModel.Value} Class='w-100'
                    OnChange={(Value) => { setPropertyModel(old => ({ ...old, Value })) }} />

            </Dialog>
        </>
    )
}