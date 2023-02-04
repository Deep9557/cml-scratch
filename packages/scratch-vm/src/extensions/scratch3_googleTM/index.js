const Runtime = require('../../engine/runtime');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const Video = require('../../io/video');

const VideoMotion = require('./library');

const tf = require('@tensorflow/tfjs');
const _tfjs = tf;

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHRpdGxlPm11c2ljLWJsb2NrLWljb248L3RpdGxlPjxkZWZzPjxwYXRoIGQ9Ik0zMi4xOCAyNS44NzRDMzIuNjM2IDI4LjE1NyAzMC41MTIgMzAgMjcuNDMzIDMwYy0zLjA3IDAtNS45MjMtMS44NDMtNi4zNzItNC4xMjYtLjQ1OC0yLjI4NSAxLjY2NS00LjEzNiA0Ljc0My00LjEzNi42NDcgMCAxLjI4My4wODQgMS44OS4yMzQuMzM4LjA4Ni42MzcuMTguOTM4LjMwMi44Ny0uMDItLjEwNC0yLjI5NC0xLjgzNS0xMi4yMy0yLjEzNC0xMi4zMDIgMy4wNi0xLjg3IDguNzY4LTIuNzUyIDUuNzA4LS44ODUuMDc2IDQuODItMy42NSAzLjg0NC0zLjcyNC0uOTg3LTQuNjUtNy4xNTMuMjYzIDE0LjczOHptLTE2Ljk5OCA1Ljk5QzE1LjYzIDM0LjE0OCAxMy41MDcgMzYgMTAuNDQgMzZjLTMuMDcgMC01LjkyMi0xLjg1Mi02LjM4LTQuMTM2LS40NDgtMi4yODQgMS42NzQtNC4xMzUgNC43NS00LjEzNSAxLjAwMyAwIDEuOTc1LjE5NiAyLjg1NS41NDMuODIyLS4wNTUtLjE1LTIuMzc3LTEuODYyLTEyLjIyOC0yLjEzMy0xMi4zMDMgMy4wNi0xLjg3IDguNzY0LTIuNzUzIDUuNzA2LS44OTQuMDc2IDQuODItMy42NDggMy44MzQtMy43MjQtLjk4Ny00LjY1LTcuMTUyLjI2MiAxNC43Mzh6IiBpZD0iYSIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0ZGRiIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iIzAwMCIgZD0iTTI4LjQ1NiAyMS42NzVjLS4wMS0uMzEyLS4wODctLjgyNS0uMjU2LTEuNzAyLS4wOTYtLjQ5NS0uNjEyLTMuMDIyLS43NTMtMy43My0uMzk1LTEuOTgtLjc2LTMuOTItMS4xNDItNi4xMTMtLjczMi00LjIyMy0uNjkzLTYuMDUuMzQ0LTYuNTI3LjUtLjIzIDEuMDYtLjA4IDEuODQuMzUuNDE0LjIyNyAyLjE4MiAxLjM2NSAyLjA3IDEuMjk2IDEuOTk0IDEuMjQyIDMuNDY0IDEuNzc0IDQuOTMgMS41NDggMS41MjYtLjIzNyAyLjUwNC0uMDYgMi44NzYuNjE4LjM0OC42MzUuMDE1IDEuNDE2LS43MyAyLjE4LTEuNDcyIDEuNTE2LTMuOTc1IDIuNTE0LTUuODQ4IDIuMDIzLS44MjItLjIyLTEuMjM4LS40NjUtMi4zOC0xLjI2N2wtLjA5NS0uMDY2Yy4wNDcuNTkzLjI2NCAxLjc0LjcxNyAzLjgwMy4yOTQgMS4zMzYgMi4wOCA5LjE4NyAyLjYzNyAxMS42NzRsLjAwMi4wMTJjLjUyOCAyLjYzNy0xLjg3MyA0LjcyNC01LjIzNiA0LjcyNC0zLjI5IDAtNi4zNjMtMS45ODgtNi44NjItNC41MjgtLjUzLTIuNjQgMS44NzMtNC43MzQgNS4yMzMtNC43MzQuNjcyIDAgMS4zNDcuMDg1IDIuMDE0LjI1LjIyNy4wNTcuNDM2LjExOC42MzYuMTg3em0tMTYuOTk2IDUuOTljLS4wMS0uMzE4LS4wOS0uODM4LS4yNjYtMS43MzctLjA5LS40Ni0uNTk1LTIuOTM3LS43NTMtMy43MjctLjM5LTEuOTYtLjc1LTMuODktMS4xMy02LjA3LS43MzItNC4yMjMtLjY5Mi02LjA1LjM0NC02LjUyNi41MDItLjIzIDEuMDYtLjA4MiAxLjg0LjM1LjQxNS4yMjcgMi4xODIgMS4zNjQgMi4wNyAxLjI5NSAxLjk5MyAxLjI0MiAzLjQ2MiAxLjc3NCA0LjkyNiAxLjU0OCAxLjUyNS0uMjQgMi41MDQtLjA2NCAyLjg3Ni42MTQuMzQ4LjYzNS4wMTUgMS40MTUtLjcyOCAyLjE4LTEuNDc0IDEuNTE3LTMuOTc3IDIuNTEzLTUuODQ3IDIuMDE3LS44Mi0uMjItMS4yMzYtLjQ2NC0yLjM3OC0xLjI2N2wtLjA5NS0uMDY1Yy4wNDcuNTkzLjI2NCAxLjc0LjcxNyAzLjgwMi4yOTQgMS4zMzcgMi4wNzggOS4xOSAyLjYzNiAxMS42NzVsLjAwMy4wMTNjLjUxNyAyLjYzOC0xLjg4NCA0LjczMi01LjIzNCA0LjczMi0zLjI4NyAwLTYuMzYtMS45OTMtNi44Ny00LjU0LS41Mi0yLjY0IDEuODg0LTQuNzMgNS4yNC00LjczLjkwNSAwIDEuODAzLjE1IDIuNjUuNDM2eiIvPjwvZz48L3N2Zz4=';

/**
 * Icon svg to be displayed in the category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE2LjA5IDEyLjkzN2MuMjI4IDEuMTQxLS44MzMgMi4wNjMtMi4zNzMgMi4wNjMtMS41MzUgMC0yLjk2Mi0uOTIyLTMuMTg2LTIuMDYzLS4yMy0xLjE0Mi44MzMtMi4wNjggMi4zNzItMi4wNjguMzIzIDAgLjY0MS4wNDIuOTQ1LjExN2EzLjUgMy41IDAgMCAxIC40NjguMTUxYy40MzUtLjAxLS4wNTItMS4xNDctLjkxNy02LjExNC0xLjA2Ny02LjE1MiAxLjUzLS45MzUgNC4zODQtMS4zNzcgMi44NTQtLjQ0Mi4wMzggMi40MS0xLjgyNSAxLjkyMi0xLjg2Mi0uNDkzLTIuMzI1LTMuNTc3LjEzMiA3LjM3ek03LjQ2IDguNTYzYy0xLjg2Mi0uNDkzLTIuMzI1LTMuNTc2LjEzIDcuMzdDNy44MTYgMTcuMDczIDYuNzU0IDE4IDUuMjIgMThjLTEuNTM1IDAtMi45NjEtLjkyNi0zLjE5LTIuMDY4LS4yMjQtMS4xNDIuODM3LTIuMDY3IDIuMzc1LTIuMDY3LjUwMSAwIC45ODcuMDk4IDEuNDI3LjI3Mi40MTItLjAyOC0uMDc0LTEuMTg5LS45My02LjExNEMzLjgzNCAxLjg3IDYuNDMgNy4wODcgOS4yODIgNi42NDZjMi44NTQtLjQ0Ny4wMzggMi40MS0xLjgyMyAxLjkxN3oiIGZpbGw9IiM1NzVFNzUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==';


class Scratch3GoogleTM {

    constructor(runtime){
        this.runtime = runtime;

        this.NUM_CLASSES=2;

        //need to get these two from sprite
        // const STATUS = document.getElementById('status');
        // const VIDEO = document.getElementById('webcam');
        this.STATUS = '';
        this.VIDEO = document.createElement('video');
        // const ENABLE_CAM_BUTTON = document.getElementById('enableCam');
        // const RESET_BUTTON = document.getElementById('reset'); //reset block
        // const TRAIN_BUTTON = document.getElementById('train'); //train block

        // Register and initialize "IO devices", containers for processing
        // I/O related data.
        /** @type {Object.<string, Object>} */
        this.ioDevices = {
            clock: new Clock(this),
            cloud: new Cloud(this),
            keyboard: new Keyboard(this),
            mouse: new Mouse(this),
            mouseWheel: new MouseWheel(this),
            userData: new UserData(),
            video: new Video(this)
        };


        this.MOBILE_NET_INPUT_WIDTH = 224;
        this.MOBILE_NET_INPUT_HEIGHT = 224;
        this.STOP_DATA_GATHER = -1;
        this.CLASS_NAMES = [];

        this.MODEL_CLASSES = [];


        this.mobilenet = undefined;
        this.gatherDataState = this.STOP_DATA_GATHER;
        this.videoPlaying = false;
        this.trainingDataInputs = [];
        this.trainingDataOutputs = [];
        this.examplesCount = [];
        this.predict = false;


        this.loadMobileNetFeatureModel();
        this.getModelHead();


        // Create video element that will contain the webcam image

        // Add video element to DOM [this is sprite area]

            //use loop, till <number of classes> [Block.button]
                //create <number of classes> buttons blocks dynamically    


            //click on train-<class name> button [Block.button]
                //on click of this buttons , it should take pictures

            // Create training buttons and info texts 
        
            //train & predict button [Block.button]

            //reset button [Block.button]
    }




    /**
     * 
     * @returns provides info about extension and its blocks
     */
    getInfo () {
        return {
            id: 'googleTM',
            name: formatMessage({
                id: 'googleTM.name',
                default: 'googleTM',
                description: 'Label for the teachable machine extension category'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                //block 1
                {
                    opcode: 'enableCam',
                    blockType: BlockType.BUTTON,
                    text: formatMessage({
                        id: 'googleTM.enableCam',
                        default:  'enable camera',
                        description: 'enable camera'
                    }),
                    arguments: {
                        // NUMBER: {
                        //     type: ArgumentType.NUMBER,
                        //     defaultValue: 2
                        // },
                    }
                },
                //block 2
                // todo : enter class name text field
                {
                    opcode: 'getClassName',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'googleTM.getClassName',
                        default:  'Enter class name [TEXT]  ',
                        description: 'get class name'
                    }),
                    arguments: {
                        NUMBER: {
                            type: ArgumentType.TEXT,
                            defaultValue: 'classA'
                        },
                    }
                },
                // block 3
                //TODO: 
                {
                    opcode: 'getImageDataOne',
                    blockType: BlockType.BUTTON,
                    text: formatMessage({
                        id: 'googleTM.getImageDataOne',
                        default:  'Get image data for first class',
                        description: 'Get image data for first class'
                    }),
                    arguments: {
                        // NUMBER: {
                        //     type: ArgumentType.NUMBER,
                        //     defaultValue: 2
                        // },
                    }
                },
                // block 3.1
                //TODO: 
                {
                    opcode: 'getImageDataTwo',
                    blockType: BlockType.BUTTON,
                    text: formatMessage({
                        id: 'googleTM.getImageDataTwo',
                        default:  'Get image data for second class',
                        description: 'Get image data for second class'
                    }),
                    arguments: {
                        // NUMBER: {
                        //     type: ArgumentType.NUMBER,
                        //     defaultValue: 2
                        // },
                    }
                },
                //block 4
                {
                    opcode: 'trainAndPredict',
                    blockType: BlockType.BUTTON,
                    text: formatMessage({
                        id: 'googleTM.trainAndPredict',
                        default:  'train and predict ',
                        description: 'train and predict'
                    }),
                    arguments: {
                        // NUMBER: {
                        //     type: ArgumentType.NUMBER,
                        //     defaultValue: 2
                        // },
                    }
                },
                //block 5
                {
                    opcode: 'reset',
                    blockType: BlockType.BUTTON,
                    text: formatMessage({
                        id: 'googleTM.reset',
                        default:  'RESET ',
                        description: 'reset everything'
                    }),
                    arguments: {
                        // NUMBER: {
                        //     type: ArgumentType.NUMBER,
                        //     defaultValue: 2
                        // },
                    }
                },
            ],
            menus: {

            }

            }
        }; //getInfo ends

        
        getClassName(args) {
            const className = Cast.toString(args.TEXT);
            console.log('className ',className);
            // if(this.CLASS_NAMES.length==0){
            //     let obj = {
            //         id: 0,
            //         name: className
            //     };
            //     this.MODEL_CLASSES.push(obj);
            // } else {
            //     let len = this.CLASS_NAMES.length;
            //     let

            // }
            this.CLASS_NAMES.push(className);
            
        }
        
        // getNumberOfClasses(args) {
        //     const numOfClasses = Cast.toNumber(args.NUMBER);
        //     console.log('numOfClasses ',numOfClasses);
        //     this.NUM_CLASSES = numOfClasses;
        // }
    
       /**
         * Purge data and start over. Note this does not dispose of the loaded 
         * MobileNet model and MLP head tensors as you will need to reuse 
         * them to train a new model.
         **/
        reset() {
            this.predict = false;
            this.examplesCount.length = 0;
            for (let i = 0; i < this.trainingDataInputs.length; i++) {
                this.trainingDataInputs[i].dispose();
            }
            this.trainingDataInputs.length = 0;
            this.trainingDataOutputs.length = 0;
            STATUS.innerText = 'No data collected';
            
            console.log('Tensors in memory: ' + tf.memory().numTensors);
        } //reset ends
    
        /**
         * this function should be called on train button click
         */
        async trainAndPredict() {
            this.predict = false;
            _tfjs.util.shuffleCombo(this.trainingDataInputs, this.trainingDataOutputs);
            let outputsAsTensor = _tfjs.tensor1d(this.trainingDataOutputs, 'int32');
            let oneHotOutputs = _tfjs.oneHot(outputsAsTensor, this.CLASS_NAMES.length);
            let inputsAsTensor = _tfjs.stack(this.trainingDataInputs);
            
            let results = await model.fit(inputsAsTensor, oneHotOutputs, {shuffle: true, batchSize: 5, epochs: 10, 
                callbacks: {onEpochEnd: logProgress} });
            
            outputsAsTensor.dispose();
            oneHotOutputs.dispose();
            inputsAsTensor.dispose();
            this.predict = true;
            this.predictLoop();
          } //trainAndPredict
          
        logProgress(epoch, logs) {
            console.log('Data for epoch ' + epoch, logs);
        } // logProgress ends
         
    
        predictLoop() {
            if (this.predict) {
              _tfjs.tidy(function() {
                let videoFrameAsTensor = _tfjs.browser.fromPixels(this.VIDEO).div(255);
                let resizedTensorFrame = _tfjs.image.resizeBilinear(videoFrameAsTensor,[this.MOBILE_NET_INPUT_HEIGHT, 
                    this.MOBILE_NET_INPUT_WIDTH], true);
          
                let imageFeatures = this.mobilenet.predict(resizedTensorFrame.expandDims());
                let prediction = model.predict(imageFeatures).squeeze();
                let highestIndex = prediction.argMax().arraySync();
                let predictionArray = prediction.arraySync();
          
                STATUS.innerText = 'Prediction: ' + this.CLASS_NAMES[highestIndex] + ' with ' + Math.floor(predictionArray[highestIndex] * 100) + '% confidence';
              });
          
              window.requestAnimationFrame(predictLoop);
            }
          } //predictLoop ends
    
        enableCam() {
            console.log('enabled cam called')
            if (this.hasGetUserMedia()) {
                // getUsermedia parameters.
                const constraints = {
                  video: true,
                  width: 640, 
                  height: 480 
                };
    
                window.navigator.mediaDevices.getUserMedia(constraints)
                    .then((mediaStream) => {
    
                    this.VIDEO.srcObject = mediaStream;
    
                    this.VIDEO.addEventListener('loadeddata', function() {
                        this.videoPlaying = true;
                        // this.ENABLE_CAM_BUTTON.classList.add('removed');  //ToDO: ENABLE_CAM, VIDEO variable
                    });
                // }).catch((err)=> {
                //     console.log(err)
                // });
                }, () => {
                    return Promise.reject('Could not open your camera. You may have denied access.');
                });
    
            
              } else {
                console.warn('getUserMedia() is not supported by your browser');
              }
        } ;// enableCam ends
    
        hasGetUserMedia() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        } //hasGetUserMedia ends
    
        getImageDataOne() { //get image data for a specific class
           let className = this.CLASS_NAMES[0];
           let classIndex= 0;
           console.log('gathering data for class ', className, ' index ', classIndex);
           this.gatherDataForClass(classIndex, className)

        } // getImageData ends

        getImageDataTwo() { //get image data for a specific class
            let className = this.CLASS_NAMES[1];
            let classIndex= 1;
            console.log('gathering data for class ', className, ' index ', classIndex);
            this.gatherDataForClass(classIndex, className)
 
         } // getImageData ends
    
        gatherDataForClass(classIndex) {
                //TODO: implement this---
                // let classNumber = parseInt(this.getAttribute('data-1hot'));
                let classNumber = classIndex;
                this.gatherDataState = (this.gatherDataState === this.STOP_DATA_GATHER) ? classNumber : this.STOP_DATA_GATHER;
                this.dataGatherLoop();
        } // gatherDataForClass ends
    
        dataGatherLoop() {
            if (this.videoPlaying && this.gatherDataState !== this.STOP_DATA_GATHER) {
              let imageFeatures = _tfjs.tidy(function() {
                let videoFrameAsTensor = _tfjs.browser.fromPixels(this.VIDEO);
                let resizedTensorFrame = _tfjs.image.resizeBilinear(videoFrameAsTensor, [this.MOBILE_NET_INPUT_HEIGHT, 
                    this.MOBILE_NET_INPUT_WIDTH], true);
                let normalizedTensorFrame = resizedTensorFrame.div(255);
                return this.mobilenet.predict(normalizedTensorFrame.expandDims()).squeeze();
              });
          
              this.trainingDataInputs.push(imageFeatures);
              this.trainingDataOutputs.push(this.gatherDataState);
              
              // Intialize array index element if currently undefined.
              if (this.examplesCount[this.gatherDataState] === undefined) {
                this.examplesCount[this.gatherDataState] = 0;
              }
              this.examplesCount[this.gatherDataState]++;
          
              this.STATUS.innerText = '';
              for (let n = 0; n < this.CLASS_NAMES.length; n++) {
                this.STATUS.innerText += this.CLASS_NAMES[n] + ' data count: ' + this.examplesCount[n] + '. ';
              }
              window.requestAnimationFrame(dataGatherLoop);
            }
          } // dataGatherLoop ends
    
    
        /**
         * Loads the MobileNet model and warms it up so ready for use.
         **/
        async loadMobileNetFeatureModel() {
            const URL = 
              'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1';
            
            this.mobilenet = await _tfjs.loadGraphModel(URL, {fromTFHub: true});
            this.STATUS.innerText = 'MobileNet v3 loaded successfully!';
            
            // Warm up the model by passing zeros through it once.
            _tfjs.tidy(function () {
              let answer = this.mobilenet.predict(_tfjs.zeros([1, this.MOBILE_NET_INPUT_HEIGHT, this.MOBILE_NET_INPUT_WIDTH, 3]));
              console.log(answer.shape);
            });
          } // loadMobileNetFeatureModel ends
    
    
    
          getModelHead() {
            let model = _tfjs.sequential();
            model.add(_tfjs.layers.dense({inputShape: [1024], units: 128, activation: 'relu'}));
            model.add(_tfjs.layers.dense({units: this.CLASS_NAMES.length, activation: 'softmax'}));
    
            model.summary();
    
            // Compile the model with the defined optimizer and specify a loss function to use.
            model.compile({
            // Adam changes the learning rate over time which is useful.
            optimizer: 'adam',
            // Use the correct loss function. If 2 classes of data, must use binaryCrossentropy.
            // Else categoricalCrossentropy is used if more than 2 classes.
            loss: (this.CLASS_NAMES.length === 2) ? 'binaryCrossentropy': 'categoricalCrossentropy', 
            // As this is a classification problem you can record accuracy in the logs too!
            metrics: ['accuracy']  
            });
    
          }// getModelHead ends
    
            

}

module.exports = Scratch3GoogleTM;