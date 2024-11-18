import React, { useState } from 'react';
import './menu.css';

export default function Menu() {
    const [activeTab, setActiveTab] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    return (
        <div className="menu-container">
            <div className="menu-bar">
                <div className="tabs-container">
                    <div className="tab">
                        <button className="tab-button" onClick={() => handleTabClick('controls')}>
                            Ship Controls
                        </button>
                        <div
                            className={`content-box ${activeTab === 'controls' ? 'active' : ''}`}
                            style={{
                                maxHeight: activeTab === 'controls' ? '400px' : '0px',
                                opacity: activeTab === 'controls' ? 1 : 0,
                                transition: 'max-height 0.5s ease, opacity 0.5s ease',
                            }}
                        >
                            {activeTab === 'controls' && (
                                <div className="control-panel">
                                    <h3 className="panel-title">Ship Controls</h3>
                                    <p className="panel-text">
                                        Use <span className="key">W</span>/<span className="key">A</span>/<span className="key">S</span>/<span className="key">D</span> to navigate the ship.
                                    </p>
                                    <p className="panel-text">
                                        Press <span className="key">Q</span>/<span className="key">E</span> to rotate the ship.
                                    </p>
                                    <p className="panel-text">
                                        Press <span className="key">T</span> to enter ship mode.
                                    </p>
                                    <p className="panel-text">
                                        Press <span className="key">R</span> to accelerate.
                                    </p>
                                    <p className="panel-text">
                                        Press <span className="key">F</span> to brake.
                                    </p>
                                    <p className="panel-text">
                                        Press <span className="key">P</span> to fire your ship's weapons.
                                    </p>
                                    <p className="panel-text">
                                        When you're in ship mode, you will see other players' ships that are also exploring the system. 
                                        You can shoot at them, but keep in mind that interactions with other ships and shooting may be buggy 
                                        due to the API being in beta testing.
                                    </p>
                                    <p className="panel-text">
                                        <strong>Note:</strong> This game is currently just a demo, and features like shooting and player interaction 
                                        are still under development.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="tab">
                        <button className="tab-button" onClick={() => handleTabClick('explore')}>
                            How to Explore
                        </button>
                        <div
                            className={`content-box ${activeTab === 'explore' ? 'active' : ''}`}
                            style={{
                                maxHeight: activeTab === 'explore' ? '400px' : '0px',
                                opacity: activeTab === 'explore' ? 1 : 0,
                                transition: 'max-height 0.5s ease, opacity 0.5s ease',
                            }}
                        >
                            {activeTab === 'explore' && (
                                <div className="control-panel">
                                    <h3 className="panel-title">How to Explore the Solar System</h3>
                                    <p className="panel-text">
                                        You can use the <span className="key">Mouse</span> to move around the solar system. 
                                        To view a planet, simply click on the transparent sphere surrounding it. 
                                        This will center the camera on that planet, and you can zoom in and out using the mouse wheel.
                                    </p>
                                    <p className="panel-text">
                                        Keep in mind that the solar system is modeled to scale, so you will need to zoom in a lot 
                                        to get a closer view of the planets.
                                    </p>
                                    <p className="panel-text">
                                        Additionally, the <span className="key">Z</span> and <span className="key">X</span> keys 
                                        are used to speed up or slow down time. Pressing <span className="key">Z</span> will accelerate time, and pressing <span className="key">X</span> 
                                        will slow it down.
                                    </p>
                                    <p className="panel-text">
                                        It's often helpful to stop time when you want to get closer to a planet or avoid any movements 
                                        while you adjust your position.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="links-container">
                    <a href="https://www.linkedin.com/in/hugo-munoz-de-morales-grado/" target="_blank" className="link">LinkedIn</a>
                    <a href="https://github.com/hugomdmg?tab=repositories" target="_blank" className="link">GitHub</a>
                    <a href="https://main.d183snd9vhmvw3.amplifyapp.com/" target="_blank" className="link">Portfolio</a>
                </div>
            </div>
        </div>
    );
}

