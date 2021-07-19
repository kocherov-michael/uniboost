// var tag = document.createElement('script');

//       tag.src = "https://www.youtube.com/iframe_api";
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//       // 3. This function creates an <iframe> (and YouTube player)
//       //    after the API code downloads.
//       var player;
//       function onYouTubeIframeAPIReady() {
//         player = new YT.Player('player', {
//           height: '390',
//           width: '640',
//           videoId: 'M7lc1UVf-VE',
//           playerVars: {
//             'playsinline': 1
//           },
//           events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//           }
//         });
//       }

//       // 4. The API will call this function when the video player is ready.
//       function onPlayerReady(event) {
//         event.target.playVideo();
//       }

//       // 5. The API calls this function when the player's state changes.
//       //    The function indicates that when playing a video (state=1),
//       //    the player should play for six seconds and then stop.
//       var done = false;
//       function onPlayerStateChange(event) {
//         if (event.data == YT.PlayerState.PLAYING && !done) {
//             // stopVideo
//           setTimeout(stopVideo, 60);
//           done = true;
//         }
//       }
//       function stopVideo() {
//         player.stopVideo();
//       }

function initPopup({container, initButtons, closeButton}){
    
    const videoButtonElem = document.querySelectorAll(initButtons)
    // const contactsButtonElem = document.querySelectorAll('[data-contacts-open-button]')
    const videoPopupElem = document.querySelector(container)
    // const contactsPopupElem = document.querySelector('#contacts-popup')
    const videoPopupCloseElem = document.querySelector(closeButton)
    try {
        videoButtonElem.forEach(openButton => {
            openButton.addEventListener('click', (e) => {
                e.preventDefault()
                videoPopupElem.classList.remove('hide')

            })
        })
    } catch(e) {
        console.log(e)
    }
    // console.log('player',player)


    // contactsButtonElem.forEach(openButton => {
    //     openButton.addEventListener('click', (e) => {
    //         e.preventDefault()
    //         console.log('open')
    //         contactsPopupElem.classList.remove('hide')
    //         console.log('videoPopupElem',videoPopupElem)
    //     })
    // })
    try {
        if (videoPopupCloseElem) {
            videoPopupCloseElem.addEventListener('click', () => {
                videoPopupElem.classList.add('hide')
                // stopVideo()
            })
        }
    } catch(e) {
        console.log(e)
    }

    try {
        videoPopupElem.addEventListener('click', () => {
            videoPopupElem.classList.add('hide')
            // stopVideo()
        })
    } catch (e) {
        console.log(e)
    }

    

}

initPopup({
    container: '#video-popup',
    initButtons: '[data-video-open-button]',
    closeButton: '#video-popup-close',
})
initPopup({
    container: '#contacts-popup',
    initButtons: '[data-contacts-open-button]',
    closeButton: '#contacts-popup-close',
})

function initScrolls() {

    const marketSection = document.querySelector('[data-market]')
    const functionalSection = document.querySelector('[data-functional-container]')
    const marketButtonElem = document.querySelector('[data-button-to-market]')
    const functionalButtonElem = document.querySelector('[data-button-to-functional]')
    const toTopElem = document.querySelector('[data-to-top]')
    
    try {
        marketButtonElem.addEventListener('click', () => {
            try {
                marketSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            catch(e) {
                window.location = 'index.html#market'
            }
        })
    } catch(e) {
        console.log(e)
    }

    // try {
    //     functionalButtonElem.addEventListener('click', () => {
    //         try {
    //             functionalSection.scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //         catch(e) {
    //             window.location = 'index.html#functional'
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    // }

    try {
        toTopElem.addEventListener('click', () => {
            document.body.scrollIntoView({
                behavior: 'smooth'
            });
        })
    } catch(e) {
        console.log(e)
    }

}


function dropdownInit(card) {
    try {
        const dropdownElem = card.querySelector('[data-dropdown]')
        const priceElem = card.querySelector('[data-price]')
        if (!dropdownElem) return
        const dropdownValueElem = dropdownElem.querySelector('[data-dropdown-value]')
        const dropdownInputElem = dropdownElem.querySelector('[data-dropdown-input]')
        const dropdownListElem = dropdownElem.querySelector('[data-dropdown-list]')
        const dropdownItemsList = dropdownElem.querySelectorAll('[data-dropdown-item]')
        let isOpen = false
    
        dropdownValueElem.addEventListener('click', () => {
            if (isOpen) {
                dropdownElem.classList.remove('dropdown--open')
                isOpen = false
            }
            else {
                dropdownElem.classList.add('dropdown--open')
                isOpen = true
            }
        })
        dropdownItemsList.forEach(item => {
            item.addEventListener('click', (e) => {
                try {
                    if (isOpen) {
                        const period = e.currentTarget.getAttribute('data-dropdown-item')
                        const price = e.currentTarget.getAttribute('data-price-value')
                        const text = e.currentTarget.innerText
                        dropdownElem.classList.remove('dropdown--open')
                        isOpen = false
                        if (period !== 'none') {
                            dropdownValueElem.setAttribute('data-dropdown-value', period)
                            dropdownInputElem.setAttribute('value', period)
                            dropdownValueElem.innerHTML = text
                            priceElem.innerHTML = price
                        }
        
                    }
                }
                catch(e) {
                    console.log(e)
                }
            })
        })
        dropdownListElem.addEventListener('mouseleave', () => {
            try {
                if (isOpen) {
                    console.log('mouseleave')
                    dropdownElem.classList.remove('dropdown--open')
                    isOpen = false
                }
            }
            catch(e) {
                console.log(e)
            }
        })
    }
    catch(e) {
        console.log(e)
    }
}

function cardInit(card, cardsElem) {
    const dropdownInputElem = card.querySelector('[data-dropdown-input]')
    const dropdownValueElem = card.querySelector('[data-dropdown-value]')
    dropdownInit(card)
    card.addEventListener('submit', e => {
        console.log('submit')
        try {
            if (dropdownInputElem) {
                const value = dropdownInputElem.getAttribute('value')
                if (value === 'none') {
                    e.preventDefault()
                    dropdownValueElem.style.outline = '1px solid red'
                    setTimeout(() => {
                        dropdownValueElem.style.outline = ''
                    },1000)
                }
            }
        }
        catch(e) {
            console.log(e)
        }

    })
    

}

function marketplaceInit () {

    const cardsElem = document.querySelectorAll('.card')
    let cardIsDeactivated = false
    cardsElem.forEach( (card) => {
        cardInit(card, cardsElem)
        function cardHandler() {
            if (cardIsDeactivated) {
                card.removeEventListener('mouseover', cardHandler)
                return
            }
            if (!cardsElem) return
            cardsElem.forEach(cardElem => {
                const cardIsSelect = cardElem.classList.contains('card--active')
                if (!cardIsSelect) return
                cardElem.classList.remove('card--active')
                cardIsDeactivated = true
            })
        }
    
        card.addEventListener('mouseover', cardHandler)
    
    })
}

initScrolls()
marketplaceInit()