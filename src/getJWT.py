import jwt
# import credentials from the .env file
from dotenv import load_dotenv
import datetime
import uuid
credentials = load_dotenv()


token = jwt.encode(
	{
		"iss": credentials['CLIENT_ID'],
		"exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=5),
		"jti": str(uuid.uuid4()),
		"aud": "tableau",
		"sub": credentials['USERNAME'],
		"scp": ["tableau:views:embed", "tableau:metrics:embed"]
,
"https://tableau.com/oda":"true",
"https://tableau.com/groups": ["Contractors", "Team C", "Group1", "Group2"],
"Region": "East"

	},
	credentials['SECRET_VALUE'],
		algorithm = "HS256",
		headers = {
		'kid': credentials['SECRET_ID'],
		'iss': credentials['CLIENT_ID']
        }
  )
