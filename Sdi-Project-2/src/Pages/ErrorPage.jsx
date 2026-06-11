import '../Styles/ErrorPage.css'

function ErrorPage() {
    
    return(
        <>
            <title>!Error</title>
            <div className='ErrorContainer'>
                <h2 className='ErrorMessage'>An Error Has Occured</h2>
                <div className='ErrorTextContainer'>
                    <p className='ErrorText'>A unknown error has occured please return to the homepage</p>
                </div>
            </div>
        </>
    )

}

export default ErrorPage;