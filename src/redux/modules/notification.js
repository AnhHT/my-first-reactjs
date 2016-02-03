import { createAction, handleActions } from 'redux-actions'

function initialiseState() {  
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.warn('Notifications aren\'t supported.')
    return
  }

  if (Notification.permission === 'denied') {
    console.warn('The user has blocked notifications.')
    return
  }

  if (!('PushManager' in window)) {
    console.warn('Push messaging isn\'t supported.')
    return
  }

  // We need the service worker registration to check for a subscription  
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
    // Do we already have a push message subscription?  
    serviceWorkerRegistration.pushManager.getSubscription()  
      .then(function(subscription) {
        // Enable any UI which subscribes / unsubscribes from  
        // push messages.  
        const pushButton = document.querySelector('.js-push-button')
        pushButton.disabled = false
        if (!subscription) {
          return
        }

        sendSubscriptionToServer(subscription)
        pushButton.textContent = 'Disable Push Messages'
        isPushEnabled = true
      })
      .catch(function(err) {
        console.warn('Error during getSubscription()', err)
      })
  })
}

export function pushNotification(isPushEnabled = false) {
  const pushButton = document.querySelector('.js-push-button')
    pushButton.addEventListener('click', function() {
      if (isPushEnabled) {
        unsubscribe()
      } else {
        subscribe()
      }
    })

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(initialiseState)
    } else {  
      console.warn('Service workers aren\'t supported in this browser.')
   }
}