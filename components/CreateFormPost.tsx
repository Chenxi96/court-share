import React, {useState} from "react";
import AutoComplete from "react-google-autocomplete"
import { FormEvent } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface postData {
    title: string,
    latitude: number,
    longitude: number,
    ownerId: string,
    description: string,
    availableSpots: number,
    email: string | null | undefined,
    name: string | null | undefined
    eventTime: string
}

export interface props {
    session: Session
    name: {
        name: string
        id: string
    }
}

const CreateFormPost: React.FC<props> = (props) => {
    const { data: session} = useSession();

    const email = props.session.user?.email
    const name = props.session.user?.name

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [postData, setPostData] = useState<postData>({
        title: '',
        latitude: 0,
        longitude: 0,
        ownerId: props.name.id,
        description: '',
        availableSpots: 0,
        email: email,
        name: name,
        eventTime: ''
    })


    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitted(true)
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        })
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        const fieldName = target.name;
        const fieldValue = target.value;

        function returnValue(fieldName: string, fieldValue: string) {
            if(fieldName === 'availableSpots') {
                return Number(fieldValue)
            }

            if(fieldName === 'eventTime') {
                return new Date(fieldValue).toISOString()
            }

            return fieldValue
        }
        
        setPostData((prevState) => ({
            ...prevState,
            [fieldName] : returnValue(fieldName, fieldValue)
        }))
    }


    if(!isSubmitted && session) {
        return (
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" onChange={handleInput}/>
                <label htmlFor="location">Location</label>
                <AutoComplete
                    id="location"
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={(place) => {
                        const latitude = place.geometry.location.lat()
                        const longitude = place.geometry.location.lng()
                        setPostData((prevState) => ({
                            ...prevState,
                            latitude : latitude,
                            longitude : longitude
                        }))
                      }}
                    options={{
                        types: ["geocode"],
                        ComponentRestrictions: { country: "ca"},
                        fields: ["formatted_address", "geometry"]
                    }}
                />
                <label htmlFor="">Description</label>
                <input type="text" name="description" id="" onChange={handleInput} />
                <label htmlFor="">Available Spots</label>
                <input type="number" name="availableSpots" id="" onChange={handleInput}/>
                <label htmlFor="">Event Time</label>
                <input type="datetime-local" name="eventTime" onChange={handleInput} />
                <input type="submit" />
            </form>
        )
    } else if(!isSubmitted && !session) {
        return(
            <p>Please log in to create post</p>
        )
    } else {
        return (
            <p>Post created</p>
        )
    }
}

export default CreateFormPost;