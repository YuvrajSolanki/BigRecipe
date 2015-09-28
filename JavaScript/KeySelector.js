var keyList = new Array(          
        "dvxh22lgMo49mIcUJqDwByd8EQG0KyTq",        
        "dvx2m0ezB6VgGO0Kujmx9RxG817UI9bc",
        "dvxmctJ89fNy96kny94tkAcyyCk7PP0E",
        "dvxT5I7wApwbINq6U61fSns8hCxxUWk7"
);
  
    var nextKeyIndex = 0;

    function getKey() {
        if (nextKeyIndex == 4)
            nextKeyIndex = 0;
        else
            nextKeyIndex = nextKeyIndex + 1;

        return(keyList[nextKeyIndex]);
    } 

  