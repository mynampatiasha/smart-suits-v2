from PIL import Image

def remove_background(img_path):
    try:
        img = Image.open(img_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # If pixel is close to white, make it transparent
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(img_path, "PNG")
        print(f"Successfully made background transparent for {img_path}")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

# Process both front and back images
remove_background(r"C:\Users\user\Downloads\smart_suits\assets\suit.png")
remove_background(r"C:\Users\user\Downloads\smart_suits\assets\suit_back.png")
