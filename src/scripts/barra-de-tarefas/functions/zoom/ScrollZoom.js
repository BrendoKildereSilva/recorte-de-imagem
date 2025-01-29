import {Area__de__trabalho } from '../../../index.js'
import {Zoom } from './zoom.js'
import { zoomout } from './zoomout.js'

Area__de__trabalho.addEventListener("wheel", (e) => {
      e.preventDefault();
      var ValueDelta = e.deltaY.toString()
      var DeltaPositivoOuNegativo = ValueDelta.slice(0, 1)
        

        if(DeltaPositivoOuNegativo == "-"){
            Zoom();
        }
        else
        {
            zoomout()
        }
});