import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Main } from 'tsparticles';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    isLoggedIn:boolean=false;
    loggedInUserId:number=0;

    constructor(private router:Router){}

    ngOnInit(): void {
        this.loggedInUserId=Number(sessionStorage.getItem("userId"));
        if(this.loggedInUserId!=0){
            this.isLoggedIn=true;
        }
    }

    id = "tsparticles";
    particlesUrl = "http://foo.bar/particles.json";
    particlesOptions = {
        background: {
            color: {
                value: "transparent",
            }
        },
        fpsLimit: 60,
        interactivity: {
            detectsOn: "canvas",
            events: {
                onClick: {
                    enable: true,
                    mode: "push"
                },
                onHover: {
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: "#ffffff"
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            collisions: {
                enable: true
            },
            move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 4,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    value_area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: "circle"
            },
            size: {
                random: true,
                value: 5
            }
        },
        detectRetina: true
    };
    particlesLoaded(container: Container): void {
        // console.log(container);
    }
    particlesInit(main: Main): void {
        // console.log(main);
    }

    logOut(){
        sessionStorage.clear();
        this.router.navigate(['/homeLink']).then(()=>{
            window.location.reload();
        });
    }

 
}



