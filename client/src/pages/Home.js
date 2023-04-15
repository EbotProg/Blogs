// import Blogs from "./Blogs";
// import { BlogContext } from '../App';
import { motion } from 'framer-motion';


const Home = () => {

   
    
    // const {blogs, loading, error} = React.useContext(BlogContext);
    
    return ( 
       
        

        <div className="home page">



    
        
        {/* <!-- Masthead--> */}
        <header className="masthead page" id="masthead">
            <div className="container px-4 px-lg-5 h-100">
                <div className="row gy-3 gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        <motion.h1
                         animate={{y: 0}} 
                         initial={{y: -100}}
                         viewport={{ once: true}}
                         transition={{type: 'tween', duration: 1}}
                         className="text-white font-weight-bold masthead-title">Post Your Blogs For Free And Get Feedback</motion.h1>
                        {/* <hr className="divider" /> */}
                    </div>
                    <div className="col-lg-8 col-xl-6 align-self-baseline">
                        <motion.p
                         animate={{x:0,opacity: 1}} 
                         initial={{x:-100, opacity: 0}}
                         viewport={{ once: true}}
                         transition={{type: 'tween', duration: 1.4}}
                         className="text-white-75 mb-5 masthead-description">Start Bootstrap can help you build better websites using the Bootstrap framework! Just download a theme and start customizing, no strings attached!</motion.p>
                        <a className="btn btn-outline-secondary text-white btn-xl find-out-more-btn" href="#about">Find Out More</a>
                    </div>
                </div>
            </div>
        </header>
        {/* <!-- About--> */}
        <section className="page-section about page" id="about">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 text-center about-page-content">
                        <motion.h2
                          initial={{ x:-100, opacity: 0}}
                          whileInView={{ x: 0, opacity: 1}}
                          viewport={{ once: true}}
                          transition={{type: 'tween', duration: 1}}
                        className="text-white mt-0">We've got what you need!</motion.h2>
                        <motion.p
                        initial={{ x:100, opacity: 0}}
                        whileInView={{ x: 0, opacity: 1}}
                        viewport={{ once: true}}
                        transition={{type: 'tween', duration: 1}}
                        className="about-page-description">Start Bootstrap has everything you need to get your new website up and running in no time! Choose one of our open source, free to download, and easy to use themes! No strings attached!</motion.p>
                        <a className="btn btn-light btn-xl" href="#services">Get Started!</a>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- Services--> */}
        <section className="page-section services page" id="services">
            <div className="container px-4 px-lg-5">
                <motion.h2 
                initial={{ y:-100, opacity: 0}}
                whileInView={{ y: 0, opacity: 1}}
                viewport={{ once: true}}
                transition={{type: 'tween', duration: 1}}                
                className="text-center mt-0">At Your Service</motion.h2>
                <div className="row gx-4 gx-lg-5">
                    <motion.div
                    initial={{ x:-100, opacity: 0}}
                    whileInView={{ x: 0, opacity: 1}}
                    viewport={{ once: true}}
                    transition={{type: 'tween', duration: 1}}
                    className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-gem fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Sturdy Themes</h3>
                            <p className="text-muted mb-0">Our themes are updated regularly to keep them bug free!</p>
                        </div>
                    </motion.div>
                    <motion.div
                    initial={{ x:100, opacity: 0}}
                    whileInView={{ x: 0, opacity: 1}}
                    viewport={{ once: true}}
                    transition={{type: 'tween', duration: 1}}
                    className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-laptop fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Up to Date</h3>
                            <p className="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
                        </div>
                    </motion.div>
                    <motion.div
                    initial={{ x:-100, opacity: 0}}
                    whileInView={{ x: 0, opacity: 1}}
                    viewport={{ once: true}}
                    transition={{type: 'tween', duration: 1}}
                    className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-globe fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Ready to Publish</h3>
                            <p className="text-muted mb-0">You can use this design as is, or you can make changes!</p>
                        </div>
                    </motion.div>
                    <motion.div
                    initial={{ x:100, opacity: 0}}
                    whileInView={{ x: 0, opacity: 1}}
                    viewport={{ once: true}}
                    transition={{type: 'tween', duration: 1}}
                    className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Made with Love</h3>
                            <p className="text-muted mb-0">Is it really open source if it's not made with love?</p>
                        </div>
                    </motion.div>
                </div>
            </div>

  
        </section>
        {/* <!-- Portfolio--> */}
        <div id="portfolio" className='portfolio page'>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-lg-4 col-sm-6 port-box">
                        <a className="portfolio-box" href="/img-2.webp" title="Blog Category">
                            <img className="img-fluid port-image" src="/img-2.webp" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">News</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 port-box">
                        <a className="portfolio-box" href="/img-3.png" title="Blog Category">
                            <img className="img-fluid port-image" src="/img-3.png" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Business</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 port-box">
                        <a className="portfolio-box" href="/img4.jpg" title="Blog Category">
                            <img className="img-fluid port-image" src="/img4.jpg" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Sport</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 port-box">
                        <a className="portfolio-box" href="/img-5.webp" title="Blog Category">
                            <img className="img-fluid port-image" src="/img-5.webp" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Technology</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 port-box">
                        <a className="portfolio-box" href="/img-8.jfif" title="Blog Category">
                            <img className="img-fluid port-image" src="/img-8.jpg" alt="..." />
                            <div className="portfolio-box-caption">
                                <div className="project-category text-white-50">Science</div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 port-box">
                        <a className="portfolio-box" href="/img-14.jpg" title="Blog Category">
                            <img className="img-fluid port-image" src="/img-14.jpg" alt="..." />
                            <div className="portfolio-box-caption p-3">
                            <div className="project-category text-white-50">Agriculture</div>

                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Call to action--> */}
        {/* <section className="page-section bg-dark text-white sign-in-up">
            <div className="container px-4 px-lg-5 text-center d-flex flex-column align-items-center justify-content-center">
                <h2 className="mb-4">Get Started</h2>
                <div className="sign-in-up-btns">
                <a className="btn btn-light btn-sm" href="https://startbootstrap.com/theme/creative/">Sign in</a>
                <a className="btn btn-light btn-sm" href="https://startbootstrap.com/theme/creative/">Sign up</a>
                </div>
                
            </div>
        </section> */}
        {/* <!-- Contact--> */}
        <section className="page-section contact page" id="contact">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6 text-center">
                        <h2 className="mt-0">Let's Get In Touch!</h2>
                        
                        <p className="text-muted mb-5">Ready to start your next project with us? Send us a messages and we will get back to you as soon as possible!</p>
                    </div>
                </div>
                <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                    <div className="col-lg-6">
                        <motion.form
                        initial={{ x:100, opacity: 0}}
                        whileInView={{ x: 0, opacity: 1}}
                        viewport={{ once: true}}
                        transition={{type: 'tween', duration: 1}}
                        id="contactForm" data-sb-form-api-token="API_TOKEN">
                            {/* <!-- Name input--> */}
                            <div className="form-floating mb-3">
                                <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                <label htmlFor="name">Full name</label>
                                <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                            </div>
                            {/* <!-- Email address input--> */}
                            <div className="form-floating mb-3">
                                <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                <label htmlFor="email">Email address</label>
                                <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                            {/* <!-- Phone number input--> */}
                            <div className="form-floating mb-3">
                                <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                <label htmlFor="phone">Phone number</label>
                                <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                            </div>
                            {/* <!-- Message input--> */}
                            <div className="form-floating mb-3">
                                <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{height: '10rem'}} data-sb-validations="required"></textarea>
                                <label htmlFor="message">Message</label>
                                <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                            {/* <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted--> */}
                            <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">Form submission successful!</div>
                                    To activate this form, sign up at
                                    <br />
                                    <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                            </div>
                            {/* <!-- Submit error message-->
                            <!---->
                            <!-- This is what your users will see when there is-->
                            <!-- an error submitting the form--> */}
                            <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                            {/* <!-- Submit Button--> */}
                            <div className="d-grid"><button className="btn btn-primary btn-xl disabled" id="submitButton" type="submit">Submit</button></div>
                        </motion.form>
                    </div>
                </div>
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-4 text-center mb-5 mb-lg-0">
                        <i className="bi-phone fs-2 mb-3 text-muted"></i>
                        <div>+1 (555) 123-4567</div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- Footer--> */}
        <footer className="bg-light py-5">
            <div className="container px-4 px-lg-5"><div className="small text-center text-muted">Copyright &copy; 2022 - Company Name</div></div>
        </footer>
    

        </div>
        
     );
}
 
export default Home;