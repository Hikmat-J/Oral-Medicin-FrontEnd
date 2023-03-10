import SERVICES from './index'

export async function GetProperty(PropertyName, OnSuccessFunc, OnErrorFunc) {
    await SERVICES.HTTP.Get(`/${PropertyName}/`).then(res => {
        if (res.data !== undefined)
            if (OnSuccessFunc && typeof (OnSuccessFunc) == 'function')
                OnSuccessFunc(res.data)
    }
    ).catch(err => {
        if (OnErrorFunc && typeof (OnErrorFunc) == 'function')
            OnErrorFunc(err)
    })
}

export async function AddProperty(PropertyName, model, OnSuccessFunc, OnErrorFunc) {
    await SERVICES.HTTP.Post(`/${PropertyName}/`, model).then(res => {
        if (res.data !== undefined)
            if (OnSuccessFunc && typeof (OnSuccessFunc) == 'function')
                OnSuccessFunc(res.data)
    }
    ).catch(err => {
        if (OnErrorFunc && typeof (OnErrorFunc) == 'function')
            OnErrorFunc(err)
    })
}

export async function AddDisease(model, OnSuccessFunc, OnErrorFunc) {
    await SERVICES.HTTP.Post('/disease/', model).then(res => {
        if (res.data !== undefined)
            if (OnSuccessFunc && typeof (OnSuccessFunc) == 'function')
                OnSuccessFunc(res.data)
    }
    ).catch(err => {
        if (OnErrorFunc && typeof (OnErrorFunc) == 'function')
            OnErrorFunc(err)
    })
}

export async function UploadImages(imageFile, ind, OnSuccessFunc, OnErrorFunc) {
    var image = new FormData();
    image.append(`image`, imageFile, imageFile.name)
    await SERVICES.HTTP.Post('/images/upload', image, true).then(res => {
        if (res.data !== undefined)
            if (OnSuccessFunc && typeof (OnSuccessFunc) == 'function')
                OnSuccessFunc(res.data)
    }
    ).catch(err => {
        if (OnErrorFunc && typeof (OnErrorFunc) == 'function')
            OnErrorFunc(err)
    })
}

//