import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { getHeightPixel, getWidthPixel, ScreenSize } from '../../../../common/helper'
import colors from '../../../../common/colors'
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetModal from '../../Messages/Components/BottomSheetModal'
import RNFS from "react-native-fs";
import DocumentPicker from "react-native-document-picker";
import ImgToBase64 from "react-native-image-base64";
import ImagePicker from "react-native-image-crop-picker";
import { AttachmentListComp } from '../../Messages/Components/AttachmentListComp';

const ProductAttachments = (props) => {
    const fileBottomSheetRef = useRef(null);
    const [flag, setFlag] = useState(false)

    const fileBottomClose = () => {
        console.log("closed");
        fileBottomSheetRef.current.close();
    };
    const fileBottomOpen = () => {
        console.log("open");
        fileBottomSheetRef.current.expand();
    };

    // Convert Image to Base64
    const convertImageToBase64 = async (img) => {
        console.log("img: ", img);
        if (img.fileInfo.fileType.substring(0, 2) == 'vi') {
            console.log('this is video')
            RNFS.readFile(img.path, "base64").then((RNFSresponse) => {
                // console.log("RNFSresponse: ", RNFSresponse);
                const obj = {
                    data: RNFSresponse,
                    fileInfo: {
                        filename: img.fileInfo.filename,
                        fileSize: img.fileInfo.fileSize,
                        fileType: img.fileInfo.fileType,
                    },
                };
                let temArray = imageArray;
                temArray.push(obj);
                setImageArray(temArray);
            });
        } else {
            if (img.path) {
                ImgToBase64.getBase64String(img.path)
                    .then((base64String) => {
                        //   console.log("base64String: ", base64String);
                        const temp = base64String;
                        const imgobj = {
                            data: temp,
                            fileInfo: img.fileInfo,
                            path: img.path,
                        };
                        let temArray = props.imageArray;
                        temArray.push(imgobj);
                        console.log("temArray.length ->", temArray.length);
                        console.log('imageArray.length -> ', props.imageArray.length)
                        props.setImageArray(temArray);
                        // getPickerData(imageArray);
                        // setImageArray([]);

                        console.log(" images array", props.imageArray.length);
                        //return temp;
                    })
                    .catch((err) => "not converted");
            }
        }
        setTimeout(() => setFlag(!flag), 500)
    };

    // Gallery Image
    const chooseImage = async () => {
        fileBottomClose();
        await ImagePicker.openPicker({
            width: getWidthPixel(300),
            height: getHeightPixel(400),
            cropping: false,
            multiple: true,
            mediaType: "any",
            useFrontCamera: true,
            smartAlbums: [
                "UserLibrary",
                "PhotoStream",
                "Panoramas",
                "Videos",
                "Bursts",
            ],
        }).then((image) => {
            //setUri(image.path);
            console.log("ma image wala hn", image);
            image.map((item) => {
                let imageName = item.filename;
                if (Platform.OS === "android") {
                    imageName = new Date();
                    console.log(" time stamp", imageName);
                }

                const imgobj = {
                    path: item.path,
                    // data: convertImageToBase64(item.path),
                    fileInfo: {
                        filename: imageName,
                        fileSize: item.size,
                        fileType: item.mime,
                    },
                };
                console.log('item -> ', item)
                convertImageToBase64(imgobj);
            });
        });
        // console.log("i am image converted in base 64", Uri);
        setTimeout(() => setFlag(!flag), 500)
    };

    // Document
    const chooseDocument = async () => {
        fileBottomClose();
        console.log("document picker called");
        try {
            const pickerResult = await DocumentPicker.pick({
                type: DocumentPicker.types.pdf,
                allowMultiSelection: true,
            });
            //  console.log("pickerResult: ", pickerResult);
            pickerResult.map(async (item) => {
                //  console.log("item: ", item);
                RNFS.readFile(item.uri, "base64").then((RNFSresponse) => {
                    // console.log("RNFSresponse: ", RNFSresponse);

                    const obj = {
                        data: RNFSresponse,
                        fileInfo: {
                            filename: item.name,
                            fileSize: item.size,
                            fileType: item.type,
                        },
                    };

                    let temArray = props.imageArray;
                    temArray.push(obj);
                    //console.log("temArray", temArray);
                    props.setImageArray(temArray);
                });
            });
        } catch (error) {
            console.log("error in picking file", error);
        }
        setTimeout(() => setFlag(!flag), 500)
    };

    // Camera
    const chooseCamera = async () => {
        fileBottomClose();
        await ImagePicker.openCamera({
            width: getWidthPixel(300),
            height: getHeightPixel(400),
            //  cropping: true,
            multiple: true,
            mediaType: "photo",
            // useFrontCamera: true,
        }).then((image) => {
            //setUri(image.path);
            console.log("ma image wala hn", image);

            let imageName = new Date();

            console.log(" time stamp", imageName);
            // image.map((item) => {
            const imgobj = {
                path: image.path,
                // data: convertImageToBase64(item.path),
                fileInfo: {
                    filename: imageName,
                    fileSize: image.size,
                    fileType: image.mime,
                },
            };

            convertImageToBase64(imgobj);
            //   );
        });
        setTimeout(() => setFlag(!flag), 500)
        // console.log("i am image converted in base 64", Uri.length);
    };

    return (
        <View style={{
            flex: 1,
            width: ScreenSize.width
        }}>
            <Text style={{
                fontFamily: 'Segoe UI',
                color: colors.mineShaft,
                fontSize: getHeightPixel(16),
                fontWeight: 'bold',
                alignSelf: 'center'
            }}>Product Attachments</Text>
            <View style={{
                paddingHorizontal: getWidthPixel(15),
                flex: 1
            }}>
                <Text style={{
                    fontFamily: "Segoe UI",
                    fontSize: getHeightPixel(12),
                    // fontWeight: "700",
                    color: colors.mineShaft,
                    marginVertical: getHeightPixel(5),
                }}>Pictures / Videos / PDFs (featured at the top, rest in order)</Text>
                <TouchableOpacity onPress={() => fileBottomOpen()}>
                    <View style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.searchBlue,
                        padding: 10,
                        borderRadius: 8,
                        marginVertical: getHeightPixel(10),
                    }}>
                        <Text style={{
                            fontFamily: 'Segoe UI',
                            fontSize: getHeightPixel(14),
                            color: colors.mineShaft,
                        }}>Click to Upload attachments.</Text>
                    </View>
                </TouchableOpacity>

                {/* {Attachments here} */}
                {
                    props.imageArray?.length > 0 &&
                    <View style={{
                        height: 100
                    }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{
                                borderTopColor: colors.grayLight,
                                borderTopWidth: 1,
                            }}>
                            <AttachmentListComp
                                Uri={props.imageArray}
                                updateArray={(item) => props.setImageArray((pre) => {
                                    return pre.filter((temp) => temp != item);
                                })}
                            />
                        </ScrollView>
                    </View>
                }
            </View>

            {/* {End Buttons} */}
            <View style={{
                flexDirection: 'row',
                marginBottom: getHeightPixel(30),
                alignSelf: 'center'
            }}>
                <TouchableOpacity onPress={() => props.onBack()}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.searchBlue,
                        marginTop: getHeightPixel(10),
                        padding: 10,
                        borderRadius: 20,
                        backgroundColor: colors.primary,
                        width: getWidthPixel(100)
                    }}>
                        <Text style={{
                            fontSize: getHeightPixel(16),
                            fontFamily: 'Segoe UI',
                            color: colors.mineShaft,
                            color: 'white'
                        }}>Back</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onNext()}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.searchBlue,
                        marginTop: getHeightPixel(10),
                        padding: 10,
                        borderRadius: 20,
                        backgroundColor: colors.primary,
                        width: getWidthPixel(100),
                        marginLeft: getWidthPixel(20)
                    }}>
                        <Text style={{
                            fontSize: getHeightPixel(16),
                            fontFamily: 'Segoe UI',
                            color: colors.mineShaft,
                            color: 'white'
                        }}>Next</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* BOTTOMSHEET FOR SELECTING DOCS, IMAGES AND CAMERA  */}
            <BottomSheet
                index={-1}
                snapPoints={[200, 190]}
                initialSnapIndex={-1}
                enablePanDownToClose={true}
                ref={fileBottomSheetRef}
            >
                <BottomSheetModal
                    fileBottomSheetRef={fileBottomSheetRef}
                    chooseDocument={chooseDocument}
                    chooseCamera={chooseCamera}
                    chooseImage={chooseImage}
                />
            </BottomSheet>
        </View>
    )
}
export default ProductAttachments