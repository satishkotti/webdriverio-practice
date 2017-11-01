<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:param name="SearchTerm"/>
<xsl:template match="/">
<GetSearchResults>
	<RequestorID>WebMD</RequestorID>

	<!-- Session ID of the user-->
	<UserID>b053de91-d62c-422a-bf98-e720be0f68dd</UserID>

	<!-- search term -->
	<SearchTerm>
    <xsl:value-of select="$SearchTerm"/>
  </SearchTerm>
	<SearchTypes>
		<SearchType>
			<SearchTypeName>Endeca</SearchTypeName>
			<Groups>
				<Group>
					<GroupName>default</GroupName>
					<QueryFields>
						<QueryOperation>
							<QueryField>
								<QueryFieldName>SiteType</QueryFieldName>
								<Operand>equals</Operand>
								<Value>cons</Value>
							</QueryField>
							<OperationType>NONE</OperationType>
						</QueryOperation>
					</QueryFields>
					<OutputFields>
						<!-- DELETE THE OUTPUT FIELD PROPERTIES THAT YOU MAY NOT BE USING -->
						<OutputField>pTitle</OutputField>
						<OutputField>pTitle.Snippet</OutputField>
						<OutputField>pClientURL</OutputField>
						<OutputField>pDescription.Snippet</OutputField>
						<OutputField>pDescription</OutputField>
						<OutputField>pBody.Snippet</OutputField>
						<OutputField>pPubDisplay</OutputField>
						<OutputField>pUID</OutputField>
						<OutputField>Archived</OutputField>
						<OutputField>pThumbnail</OutputField>
					</OutputFields>
					<Limits>
						<Limit>
							<Name>NumOfResults</Name>
							<Value>1</Value>
						</Limit>
						<Limit>
							<Name>ResultsStart</Name>
							<Value>0</Value>
						</Limit>
					</Limits>
					<Weights></Weights>
					<SortOperations></SortOperations>
					<!-- 
						Navigation state of the video spotlight. This value remains constant in all the environemtns
						so it can be stored in a config file. (The same approach of storing the navstate value in config
						file is followed for drug news page)
					-->
					<NavigationState>62</NavigationState>
					<requireSupplements>True</requireSupplements>
					<requireBreadCrumbs>True</requireBreadCrumbs>
					<requireDimSearchResults>True</requireDimSearchResults>
					<requireSuggestions>True</requireSuggestions>
					<requireRefinements>True</requireRefinements>
					<requireRedirects>True</requireRedirects>
				</Group>
			</Groups>
		</SearchType>
	</SearchTypes>
</GetSearchResults>
</xsl:template>

</xsl:stylesheet> 
