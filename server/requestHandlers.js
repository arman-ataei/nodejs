const fs = require('fs');
const path = require("path")
const formidable = require("formidable")
const { type } = require('os');

function show_page(path_to_page, res){
    fs.readFile(path_to_page, function(err, data) {
        if (err){
            console.log(err)
            throw err
        }else{
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
        }
    })
}


function home(res){
    console.log("Hello Home.")
    var home_path = './pages/home.html'
    show_page(home_path, res)
        
}


function form(res){
    console.log("Hello Form.")
    var form_path = './pages/form.html'
    show_page(form_path, res)
}

function notFound(res){
    console.log("404 Not Found")
    var path_404 = './pages/404.html'
    show_page(path_404, res)
}

function uploaded(res, req){
    console.log("The file has been completly uploaded")
    const form = new formidable.IncomingForm()
    form.multiples = true;
    form.maxFileSize = 50 *1024 *1024;
    
    //You had to use absolute path, unless for two different request 
    form.uploadDir = path.join(__dirname.split(path.sep).slice(0,-1).join(path.sep), "/Uploads")
    // console.log(form)
    form .parse(req, function(err, fields, files){
       if(err){
        console.log(err)
        throw err
       }else{
            // `filetouploaded` is the `action` attribute of the form that has been submitted
            // console.log(files)
            var options = files.filetouploaded[0]
            var oldPath = options.filepath
            var newPath = path.join(form.uploadDir,options.originalFilename)
            // fs.rename(options.filepath, path.join(form.uploadDir, options.newFilename) )
            function changeNames_and_show_success(old_path_to_the_file, new_path_to_the_file, path_to_success, response){
                // TODO1: checking that the file exists or not

                // TODO2: asking the user if he wants to overwrite the file

                // TODO3: process his request
                
                fs.rename(old_path_to_the_file, new_path_to_the_file,function(err){
                    if(err){
                      console.log(JSON.stringify(err))
                      throw err
                    }else{
                        show_page(path_to_success,response)
                    }
                })
            }
            var success_path = "./pages/success.html"
            var promisedContent = new Promise((resolve, reject)=>{
                        // result of the http request
                        var val = [oldPath, newPath, success_path,res]
                        setTimeout(function() {resolve(val)}, 5000);
            })
            promisedContent.then((result)=>{
                changeNames_and_show_success(...result)
                // console.log(result)
                console.log("content uploaded successfully")
            })
            
       }
    })
}
exports.home = home
exports.form = form
exports.notFound = notFound
exports.uploaded = uploaded