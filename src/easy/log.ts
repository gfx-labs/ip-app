
const debug_mode = import.meta.env.DEV;

export const verbose = (...args:any[])=> {
    show("VERBOSE",...args)
}

export const warn = (...args:any[])=> {
    show("WARN",...args)
}

export const debug = (...args:any[])=> {
  if(debug_mode){
    show("DEBUG",...args)
  }
}

export const trace = (...args:any[])=> {
  if(debug_mode){
    show("TRACE",...args)
  }
}

export const show = (level:string, ...args:any[])=> {
    console.log(`[${level}]`,...args)
}

export const log = {
    verbose: verbose,
    warn:warn,
    debug: debug,
    trace: trace,
    show:show,
}

