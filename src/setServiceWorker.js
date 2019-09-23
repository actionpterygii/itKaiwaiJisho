if ('serviceWorker' in navigator)
{
    window.addEventListener('load', function()
    {
        navigator.serviceWorker.register('serviceWorker.js').then(function(registration)
        {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            更新があったら更新
            registration.onupdatefound = function()
            {
                console.log('Update A Ruyo.');
                registration.update();
            }
        },
        function(err)
        {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}