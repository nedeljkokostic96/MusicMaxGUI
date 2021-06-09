import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/Comment';


@Component({
  selector: 'app-comment-festival',
  templateUrl: './comment-festival.component.html',
  styleUrls: ['./comment-festival.component.css']
})
export class CommentFestivalComponent implements OnInit {
  @Input() comment:Comment; 
  @Input() index:number;
  avatars:string[] = [
    'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=Black&eyeType=Happy&eyebrowType=UpDown&mouthType=Grimace&skinColor=Pale',
    'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Sunglasses&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=BlondeGolden&clotheType=BlazerShirt&clotheColor=Blue03&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&mouthType=Twinkle&skinColor=Pale',
    'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Wayfarers&hatColor=PastelOrange&hairColor=BlondeGolden&facialHairType=Blank&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=White&eyeType=Dizzy&eyebrowType=FlatNatural&mouthType=Serious&skinColor=Pale',
    'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hatColor=PastelGreen&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Blonde&clotheType=BlazerSweater&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=UpDown&mouthType=Tongue&skinColor=Pale',
    'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFro&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=Blank&facialHairColor=Red&clotheType=ShirtCrewNeck&clotheColor=White&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Yellow',
    'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Cry&eyebrowType=Angry&mouthType=Disbelief&skinColor=Pale',
    'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Blank&hairColor=Blonde&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=Overall&clotheColor=Blue01&graphicType=SkullOutline&eyeType=Surprised&eyebrowType=UpDown&mouthType=Smile&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Wayfarers&hatColor=Red&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=BlazerSweater&clotheColor=Blue01&eyeType=Squint&eyebrowType=SadConcerned&mouthType=Tongue&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=PastelPink&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=GraphicShirt&clotheColor=Blue03&graphicType=Diamond&eyeType=Hearts&eyebrowType=UpDownNatural&mouthType=Eating&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Kurt&hatColor=PastelGreen&facialHairType=MoustacheFancy&facialHairColor=Blonde&clotheType=ShirtVNeck&clotheColor=Heather&eyeType=Squint&eyebrowType=Angry&mouthType=Grimace&skinColor=Tanned',
    'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Kurt&hatColor=White&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=ShirtVNeck&clotheColor=Red&eyeType=Close&eyebrowType=RaisedExcited&mouthType=Twinkle&skinColor=Tanned',
    'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Prescription01&hairColor=SilverGray&facialHairType=BeardMedium&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=Black&graphicType=Hola&eyeType=Close&eyebrowType=AngryNatural&mouthType=Smile&skinColor=Black'
  ]

  get avatar():string{
    const random = Math.floor(Math.random() * this.avatars.length);
    

    return this.avatars[this.index];
  }


  constructor() { }

  ngOnInit(): void {
  }

}
