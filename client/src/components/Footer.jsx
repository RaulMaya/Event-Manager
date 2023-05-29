import React from 'react';

const Footer = () => {
    return (
        <footer className="fixed-bottom bg-light">
            <div className="container py-2"> {/* Reduced py-4 to py-2 */}
                <div className="row">
                    <div className="col">
                        <blockquote className="blockquote text-center">
                            <p className="mb-2">Event Manager - A project for managing events</p> {/* Reduced mb-3 to mb-2 */}
                            <footer className="blockquote-footer">Developed by Team 2</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;